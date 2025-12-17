import AdminSMBEditClient from './AdminSMBEditClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function AdminSMBEditPage({ params }: PageProps) {
  const { slug } = await params
  return <AdminSMBEditClient slug={slug} />
}
