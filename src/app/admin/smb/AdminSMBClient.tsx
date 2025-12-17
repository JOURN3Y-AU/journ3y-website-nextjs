'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Plus,
  Edit,
  Eye,
  GripVertical,
  ExternalLink,
  Loader2
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import type { SMBIndustry } from '@/types/smb'

export default function AdminSMBClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [industries, setIndustries] = useState<SMBIndustry[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
    fetchIndustries()
  }

  const fetchIndustries = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('smb_industries')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setIndustries(data || [])
    } catch (error) {
      console.error('Error fetching industries:', error)
      toast({
        title: 'Error',
        description: 'Failed to load industries',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('smb_industries')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setIndustries(industries.map(ind =>
        ind.id === id ? { ...ind, is_active: !currentStatus } : ind
      ))

      toast({
        title: 'Updated',
        description: `Industry ${!currentStatus ? 'published' : 'unpublished'} successfully`,
      })
    } catch (error) {
      console.error('Error updating industry:', error)
      toast({
        title: 'Error',
        description: 'Failed to update industry status',
        variant: 'destructive',
      })
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
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">SMB Industries</h1>
            <p className="text-muted-foreground">Manage industry pages for small business</p>
          </div>
        </div>
        <Button onClick={() => router.push('/admin/smb/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Industry
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : industries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No industries found</p>
            <Button onClick={() => router.push('/admin/smb/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Industry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {industries.map((industry, index) => {
            const Icon = getIconComponent(industry.icon_name)
            return (
              <Card key={industry.id} className={!industry.is_active ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Drag handle placeholder */}
                    <div className="cursor-move text-muted-foreground">
                      <GripVertical className="h-5 w-5" />
                    </div>

                    {/* Order number */}
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{industry.name}</h3>
                        <span className="text-sm text-muted-foreground">/{industry.slug}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {industry.tagline}
                      </p>
                    </div>

                    {/* Status toggle */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {industry.is_active ? 'Published' : 'Draft'}
                      </span>
                      <Switch
                        checked={industry.is_active}
                        onCheckedChange={() => handleToggleActive(industry.id, industry.is_active)}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <Link href={`/smb/${industry.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/admin/smb/${industry.slug}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="mt-8 p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p className="font-medium mb-2">Quick Links:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/smb" className="flex items-center gap-1 hover:text-foreground">
            <ExternalLink className="w-3 h-3" />
            SMB Landing Page
          </Link>
          <Link href="/contact" className="flex items-center gap-1 hover:text-foreground">
            <ExternalLink className="w-3 h-3" />
            Contact Page
          </Link>
        </div>
      </div>
    </div>
  )
}
