'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// Common Lucide icons for selection
const COMMON_ICONS = [
  'Building', 'Home', 'Users', 'Heart', 'Briefcase', 'ShoppingBag',
  'GraduationCap', 'DollarSign', 'UtensilsCrossed', 'Factory', 'Hammer',
  'FileText', 'MessageSquare', 'Calendar', 'Clock', 'Search', 'Bell',
  'BarChart', 'Star', 'Mail', 'Phone', 'Send', 'Package', 'Truck',
  'ClipboardCheck', 'AlertCircle', 'Eye', 'Wrench', 'Activity', 'UserPlus',
  'ThumbsUp', 'RefreshCw', 'Camera', 'FolderOpen', 'GitBranch', 'Zap'
]

export default function AdminSMBNewClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    icon_name: 'Building',
    hero_headline: '',
    hero_subhead: '',
  })

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
  }

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    setFormData({
      ...formData,
      name,
      slug,
    })
  }

  const handleCreate = async () => {
    if (!formData.name || !formData.slug || !formData.tagline) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setSaving(true)
    try {
      // Get the highest display_order
      const { data: existing } = await supabase
        .from('smb_industries')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)

      const nextOrder = (existing?.[0]?.display_order ?? 0) + 1

      const { data, error } = await supabase
        .from('smb_industries')
        .insert({
          name: formData.name,
          slug: formData.slug,
          tagline: formData.tagline,
          icon_name: formData.icon_name,
          hero_headline: formData.hero_headline || formData.name,
          hero_subhead: formData.hero_subhead || formData.tagline,
          display_order: nextOrder,
          is_active: false, // Start as draft
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: 'Created',
        description: 'Industry created successfully',
      })

      router.push(`/admin/smb/${data.slug}`)
    } catch (error: unknown) {
      console.error('Error creating industry:', error)
      const errorMessage = error instanceof Error && error.message.includes('duplicate')
        ? 'An industry with this slug already exists'
        : 'Failed to create industry'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Building
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/smb')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Industry</h1>
          <p className="text-muted-foreground">Create a new SMB industry page</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Industry Details</CardTitle>
          <CardDescription>Basic information to get started. You can add more details after creation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Industry Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Plumbing & HVAC"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">/smb/</span>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="plumbing-hvac"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g., Stop losing jobs to paperwork"
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

          <div className="space-y-2">
            <Label htmlFor="hero_headline">Hero Headline (optional)</Label>
            <Input
              id="hero_headline"
              value={formData.hero_headline}
              onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
              placeholder="Main headline for the page"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_subhead">Hero Subheadline (optional)</Label>
            <Textarea
              id="hero_subhead"
              value={formData.hero_subhead}
              onChange={(e) => setFormData({ ...formData, hero_subhead: e.target.value })}
              placeholder="Supporting text below the headline"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => router.push('/admin/smb')}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={saving}>
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Create Industry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
