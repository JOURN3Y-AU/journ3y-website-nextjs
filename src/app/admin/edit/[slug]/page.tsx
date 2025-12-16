import AdminEditPostClient from './AdminEditPostClient'

interface AdminEditPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
  const { slug } = await params
  return <AdminEditPostClient slug={slug} />
}
