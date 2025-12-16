import { redirect } from 'next/navigation'
import { Metadata } from 'next'

interface DocumentProxyPageProps {
  params: Promise<{ filename: string }>
}

export async function generateMetadata({ params }: DocumentProxyPageProps): Promise<Metadata> {
  const { filename } = await params
  return {
    title: `Document: ${filename} | JOURN3Y`,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function DocumentProxyPage({ params }: DocumentProxyPageProps) {
  const { filename } = await params

  // Redirect to the API route for serving the document
  redirect(`/api/documents/${filename}`)
}
