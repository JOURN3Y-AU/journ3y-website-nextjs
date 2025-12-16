import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params

  if (!filename) {
    return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
  }

  try {
    const supabase = await createClient()

    // First, verify the document exists in our database
    const { data: docData, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('filename', filename)
      .single()

    if (docError || !docData) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Get the file from Supabase Storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from('documents')
      .download(docData.file_path)

    if (fileError || !fileData) {
      return NextResponse.json({ error: 'Failed to load document' }, { status: 500 })
    }

    // Convert blob to array buffer
    const arrayBuffer = await fileData.arrayBuffer()

    // Determine content disposition based on mime type
    const mimeType = docData.mime_type || 'application/octet-stream'
    const isInlineViewable = mimeType.startsWith('image/') || mimeType === 'application/pdf'
    const disposition = isInlineViewable ? 'inline' : `attachment; filename="${docData.original_filename}"`

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': disposition,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    console.error('Error serving document:', err)
    return NextResponse.json({ error: 'Failed to load document' }, { status: 500 })
  }
}
