import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { businessDescription } = await request.json()

    if (!businessDescription || typeof businessDescription !== 'string') {
      return NextResponse.json(
        { error: 'Business description is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    // Get active industries from Supabase
    const supabase = await createClient()
    const { data: industries, error: dbError } = await supabase
      .from('smb_industries')
      .select('id, slug, name, tagline, icon_name')
      .eq('is_active', true)

    if (dbError || !industries || industries.length === 0) {
      console.error('Error fetching industries:', dbError)
      return NextResponse.json(
        { error: 'Failed to fetch industries' },
        { status: 500 }
      )
    }

    const industryList = industries
      .map(i => `- ${i.slug}: ${i.name} - ${i.tagline}`)
      .join('\n')

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a business industry classifier for JOURN3Y, an AI consulting company for Australian small businesses.

Match this business description to the most appropriate industry:

"${businessDescription}"

Available industries:
${industryList}

Rules:
- Always return a match, even if confidence is low
- If the business spans multiple industries, choose the PRIMARY revenue source
- Service businesses (cleaning, gardening, mobile services) → typically retail or professional-services
- If truly unsure, default to professional-services

Return ONLY valid JSON (no markdown, no explanation):
{
  "matchedIndustry": "slug",
  "confidence": "high|medium|low",
  "reasoning": "One sentence explanation shown to user",
  "alternateIndustries": ["slug1", "slug2"]
}`
        }
      ]
    })

    // Extract text content from the response
    const textContent = message.content.find(block => block.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response')
    }

    // Parse the AI response
    let result
    try {
      result = JSON.parse(textContent.text)
    } catch {
      console.error('Failed to parse AI response:', textContent.text)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    // Validate matched industry exists
    const matchedIndustry = industries.find(i => i.slug === result.matchedIndustry)
    if (!matchedIndustry) {
      // Fallback to professional-services if match not found
      const fallback = industries.find(i => i.slug === 'professional-services')
      if (fallback) {
        result.matchedIndustry = 'professional-services'
        result.confidence = 'low'
        result.reasoning = 'Based on your description, we think professional services might be a good fit.'
      }
    }

    // Fetch full details of matched industry
    const { data: fullMatchedIndustry, error: matchError } = await supabase
      .from('smb_industries')
      .select('*')
      .eq('slug', result.matchedIndustry)
      .single()

    if (matchError || !fullMatchedIndustry) {
      return NextResponse.json(
        { error: 'Failed to fetch matched industry' },
        { status: 500 }
      )
    }

    // Fetch alternate industries
    const validAlternates = (result.alternateIndustries || []).filter((slug: string) =>
      industries.some(i => i.slug === slug && i.slug !== result.matchedIndustry)
    ).slice(0, 3)

    let alternates: { slug: string; name: string; tagline: string }[] = []
    if (validAlternates.length > 0) {
      const { data: alternateData } = await supabase
        .from('smb_industries')
        .select('slug, name, tagline')
        .in('slug', validAlternates)

      alternates = alternateData || []
    }

    return NextResponse.json({
      matchedIndustry: fullMatchedIndustry,
      confidence: result.confidence,
      reasoning: result.reasoning,
      alternateIndustries: alternates,
    })
  } catch (error) {
    console.error('Error in match-industry API:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
