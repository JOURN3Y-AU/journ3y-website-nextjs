'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Plus,
  GripVertical,
  Loader2,
  ExternalLink
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import type { SMBIndustryWithDetails, SMBPainPoint, SMBUseCase, SMBFAQ } from '@/types/smb'

interface AdminSMBEditClientProps {
  slug: string
}

// Common Lucide icons for selection
const COMMON_ICONS = [
  'Building', 'Home', 'Users', 'Heart', 'Briefcase', 'ShoppingBag',
  'GraduationCap', 'DollarSign', 'UtensilsCrossed', 'Factory', 'Hammer',
  'FileText', 'MessageSquare', 'Calendar', 'Clock', 'Search', 'Bell',
  'BarChart', 'Star', 'Mail', 'Phone', 'Send', 'Package', 'Truck',
  'ClipboardCheck', 'AlertCircle', 'Eye', 'Wrench', 'Activity', 'UserPlus',
  'ThumbsUp', 'RefreshCw', 'Camera', 'FolderOpen', 'GitBranch', 'Zap'
]

export default function AdminSMBEditClient({ slug }: AdminSMBEditClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [industry, setIndustry] = useState<SMBIndustryWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    icon_name: 'Building',
    hero_headline: '',
    hero_subhead: '',
    hero_image_url: '',
    results_statement: '',
    metadata_title: '',
    metadata_description: '',
    metadata_keywords: [] as string[],
    related_industries: [] as string[],
    is_active: true,
    display_order: 0,
  })

  const [painPoints, setPainPoints] = useState<SMBPainPoint[]>([])
  const [useCases, setUseCases] = useState<SMBUseCase[]>([])
  const [faqs, setFaqs] = useState<SMBFAQ[]>([])

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    fetchIndustry()
  }

  const fetchIndustry = async () => {
    setLoading(true)
    try {
      // Fetch industry
      const { data: ind, error: indError } = await supabase
        .from('smb_industries')
        .select('*')
        .eq('slug', slug)
        .single()

      if (indError) throw indError

      // Fetch related data
      const [painPointsRes, useCasesRes, faqsRes] = await Promise.all([
        supabase.from('smb_pain_points').select('*').eq('industry_id', ind.id).order('display_order'),
        supabase.from('smb_use_cases').select('*').eq('industry_id', ind.id).order('display_order'),
        supabase.from('smb_faqs').select('*').eq('industry_id', ind.id).order('display_order'),
      ])

      setIndustry({
        ...ind,
        pain_points: painPointsRes.data || [],
        use_cases: useCasesRes.data || [],
        faqs: faqsRes.data || [],
      })

      setFormData({
        name: ind.name,
        slug: ind.slug,
        tagline: ind.tagline,
        icon_name: ind.icon_name,
        hero_headline: ind.hero_headline,
        hero_subhead: ind.hero_subhead,
        hero_image_url: ind.hero_image_url || '',
        results_statement: ind.results_statement || '',
        metadata_title: ind.metadata_title || '',
        metadata_description: ind.metadata_description || '',
        metadata_keywords: ind.metadata_keywords || [],
        related_industries: ind.related_industries || [],
        is_active: ind.is_active,
        display_order: ind.display_order,
      })

      setPainPoints(painPointsRes.data || [])
      setUseCases(useCasesRes.data || [])
      setFaqs(faqsRes.data || [])

    } catch (error) {
      console.error('Error fetching industry:', error)
      toast({
        title: 'Error',
        description: 'Failed to load industry data',
        variant: 'destructive',
      })
      router.push('/admin/smb')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!industry) return

    setSaving(true)
    try {
      // Update main industry data
      const { error: indError } = await supabase
        .from('smb_industries')
        .update({
          name: formData.name,
          slug: formData.slug,
          tagline: formData.tagline,
          icon_name: formData.icon_name,
          hero_headline: formData.hero_headline,
          hero_subhead: formData.hero_subhead,
          hero_image_url: formData.hero_image_url || null,
          results_statement: formData.results_statement || null,
          metadata_title: formData.metadata_title || null,
          metadata_description: formData.metadata_description || null,
          metadata_keywords: formData.metadata_keywords,
          related_industries: formData.related_industries,
          is_active: formData.is_active,
          display_order: formData.display_order,
        })
        .eq('id', industry.id)

      if (indError) throw indError

      // Update pain points - delete and recreate
      await supabase.from('smb_pain_points').delete().eq('industry_id', industry.id)
      if (painPoints.length > 0) {
        const { error: ppError } = await supabase.from('smb_pain_points').insert(
          painPoints.map((pp, idx) => ({
            industry_id: industry.id,
            title: pp.title,
            description: pp.description,
            display_order: idx,
          }))
        )
        if (ppError) throw ppError
      }

      // Update use cases - delete and recreate
      await supabase.from('smb_use_cases').delete().eq('industry_id', industry.id)
      if (useCases.length > 0) {
        const { error: ucError } = await supabase.from('smb_use_cases').insert(
          useCases.map((uc, idx) => ({
            industry_id: industry.id,
            title: uc.title,
            description: uc.description,
            benefit: uc.benefit || null,
            icon_name: uc.icon_name,
            image_url: uc.image_url || null,
            display_order: idx,
          }))
        )
        if (ucError) throw ucError
      }

      // Update FAQs - delete and recreate
      await supabase.from('smb_faqs').delete().eq('industry_id', industry.id)
      if (faqs.length > 0) {
        const { error: faqError } = await supabase.from('smb_faqs').insert(
          faqs.map((faq, idx) => ({
            industry_id: industry.id,
            question: faq.question,
            answer: faq.answer,
            display_order: idx,
          }))
        )
        if (faqError) throw faqError
      }

      toast({
        title: 'Saved',
        description: 'Industry updated successfully',
      })

      // Redirect if slug changed
      if (formData.slug !== slug) {
        router.push(`/admin/smb/${formData.slug}`)
      }

    } catch (error) {
      console.error('Error saving industry:', error)
      toast({
        title: 'Error',
        description: 'Failed to save industry',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!industry) return
    if (!confirm('Are you sure you want to delete this industry? This cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('smb_industries')
        .delete()
        .eq('id', industry.id)

      if (error) throw error

      toast({
        title: 'Deleted',
        description: 'Industry deleted successfully',
      })

      router.push('/admin/smb')
    } catch (error) {
      console.error('Error deleting industry:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete industry',
        variant: 'destructive',
      })
    }
  }

  // Pain point handlers
  const addPainPoint = () => {
    setPainPoints([...painPoints, {
      id: `new-${Date.now()}`,
      industry_id: industry?.id || '',
      title: '',
      description: '',
      display_order: painPoints.length,
      created_at: new Date().toISOString(),
    }])
  }

  const updatePainPoint = (index: number, field: keyof SMBPainPoint, value: string) => {
    const updated = [...painPoints]
    updated[index] = { ...updated[index], [field]: value }
    setPainPoints(updated)
  }

  const removePainPoint = (index: number) => {
    setPainPoints(painPoints.filter((_, i) => i !== index))
  }

  // Use case handlers
  const addUseCase = () => {
    setUseCases([...useCases, {
      id: `new-${Date.now()}`,
      industry_id: industry?.id || '',
      title: '',
      description: '',
      benefit: '',
      icon_name: 'Zap',
      image_url: null,
      display_order: useCases.length,
      created_at: new Date().toISOString(),
    }])
  }

  const updateUseCase = (index: number, field: keyof SMBUseCase, value: string | null) => {
    const updated = [...useCases]
    updated[index] = { ...updated[index], [field]: value }
    setUseCases(updated)
  }

  const removeUseCase = (index: number) => {
    setUseCases(useCases.filter((_, i) => i !== index))
  }

  // FAQ handlers
  const addFaq = () => {
    setFaqs([...faqs, {
      id: `new-${Date.now()}`,
      industry_id: industry?.id || '',
      question: '',
      answer: '',
      display_order: faqs.length,
      created_at: new Date().toISOString(),
    }])
  }

  const updateFaq = (index: number, field: keyof SMBFAQ, value: string) => {
    const updated = [...faqs]
    updated[index] = { ...updated[index], [field]: value }
    setFaqs(updated)
  }

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Building
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!industry) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-muted-foreground">Industry not found</p>
        <Button onClick={() => router.push('/admin/smb')} className="mt-4">
          Back to Industries
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/smb')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Industry</h1>
            <p className="text-muted-foreground">{formData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/small-business-ai/${formData.slug}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="faqs">FAQs ({faqs.length})</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Details</CardTitle>
              <CardDescription>Basic information about this industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Short catchy phrase"
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_ICONS.map((iconName) => {
                    const Icon = getIconComponent(iconName)
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon_name: iconName })}
                        className={`p-2 rounded border transition-colors ${
                          formData.icon_name === iconName
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                        title={iconName}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <Label>Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.is_active ? 'Published and visible' : 'Draft (not visible)'}
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>The main banner at the top of the page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero_headline">Headline</Label>
                <Input
                  id="hero_headline"
                  value={formData.hero_headline}
                  onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                  placeholder="Main headline"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subhead">Subheadline</Label>
                <Textarea
                  id="hero_subhead"
                  value={formData.hero_subhead}
                  onChange={(e) => setFormData({ ...formData, hero_subhead: e.target.value })}
                  placeholder="Supporting text"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="results_statement">Results Statement</Label>
                <Input
                  id="results_statement"
                  value={formData.results_statement}
                  onChange={(e) => setFormData({ ...formData, results_statement: e.target.value })}
                  placeholder='e.g., "Construction clients typically save 8-12 hours per week"'
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_image_url">Hero Image URL</Label>
                <Input
                  id="hero_image_url"
                  value={formData.hero_image_url}
                  onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  Use Unsplash URLs for free stock images. Recommended size: 800x600px or similar aspect ratio.
                </p>
                {formData.hero_image_url && (
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <img
                      src={formData.hero_image_url}
                      alt="Hero preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          {/* Pain Points */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Pain Points ({painPoints.length})</CardTitle>
                  <CardDescription>Customer challenges this industry faces</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addPainPoint}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {painPoints.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No pain points yet</p>
              ) : (
                <div className="space-y-4">
                  {painPoints.map((pp, index) => (
                    <div key={pp.id} className="flex gap-3 items-start p-3 border rounded-lg">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-move flex-shrink-0 mt-2" />
                      <div className="flex-1 space-y-2">
                        <Input
                          value={pp.title}
                          onChange={(e) => updatePainPoint(index, 'title', e.target.value)}
                          placeholder="Pain point title"
                        />
                        <Textarea
                          value={pp.description}
                          onChange={(e) => updatePainPoint(index, 'description', e.target.value)}
                          placeholder="Description"
                          rows={2}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePainPoint(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Use Cases ({useCases.length})</CardTitle>
                  <CardDescription>AI solutions and their benefits</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addUseCase}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {useCases.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No use cases yet</p>
              ) : (
                <Accordion type="multiple" className="space-y-2">
                  {useCases.map((uc, index) => (
                    <AccordionItem key={uc.id} value={uc.id} className="border rounded-lg px-3">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                          {(() => {
                            const Icon = getIconComponent(uc.icon_name)
                            return <Icon className="w-4 h-4" />
                          })()}
                          <span>{uc.title || 'Untitled Use Case'}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            value={uc.title}
                            onChange={(e) => updateUseCase(index, 'title', e.target.value)}
                            placeholder="Title"
                          />
                          <div className="flex gap-2">
                            <select
                              value={uc.icon_name}
                              onChange={(e) => updateUseCase(index, 'icon_name', e.target.value)}
                              className="px-3 py-2 border rounded-md text-sm flex-1"
                            >
                              {COMMON_ICONS.map((icon) => (
                                <option key={icon} value={icon}>{icon}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <Textarea
                          value={uc.description}
                          onChange={(e) => updateUseCase(index, 'description', e.target.value)}
                          placeholder="Description"
                          rows={3}
                        />
                        <Input
                          value={uc.benefit || ''}
                          onChange={(e) => updateUseCase(index, 'benefit', e.target.value)}
                          placeholder="Benefit (shown with checkmark)"
                        />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" onClick={() => removeUseCase(index)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>FAQs ({faqs.length})</CardTitle>
                  <CardDescription>Frequently asked questions - important for SEO and AI indexing</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addFaq}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {faqs.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No FAQs yet</p>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={faq.id} className="flex gap-3 items-start p-4 border rounded-lg">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-move flex-shrink-0 mt-2" />
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Question</Label>
                          <Input
                            value={faq.question}
                            onChange={(e) => updateFaq(index, 'question', e.target.value)}
                            placeholder="Question"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Answer</Label>
                          <Textarea
                            value={faq.answer}
                            onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                            placeholder="Answer"
                            rows={3}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFaq(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
              <CardDescription>Search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metadata_title">Page Title</Label>
                <Input
                  id="metadata_title"
                  value={formData.metadata_title}
                  onChange={(e) => setFormData({ ...formData, metadata_title: e.target.value })}
                  placeholder="SEO title (50-60 characters)"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metadata_title.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata_description">Meta Description</Label>
                <Textarea
                  id="metadata_description"
                  value={formData.metadata_description}
                  onChange={(e) => setFormData({ ...formData, metadata_description: e.target.value })}
                  placeholder="SEO description (150-160 characters)"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metadata_description.length}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata_keywords">Keywords (comma separated)</Label>
                <Textarea
                  id="metadata_keywords"
                  value={formData.metadata_keywords.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    metadata_keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  })}
                  placeholder="keyword1, keyword2, keyword3"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Related Industries (comma separated slugs)</Label>
                <Input
                  value={formData.related_industries.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    related_industries: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  })}
                  placeholder="construction, real-estate, professional-services"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this page appears in search results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-muted/30">
                <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                  {formData.metadata_title || `AI for ${formData.name} Australia | JOURN3Y`}
                </p>
                <p className="text-green-700 text-sm">
                  journ3y.com.au/small-business-ai/{formData.slug}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {formData.metadata_description || `AI consulting and automation for ${formData.name} businesses in Australia.`}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
