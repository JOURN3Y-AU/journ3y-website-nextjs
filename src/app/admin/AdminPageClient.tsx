'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'

export default function AdminPageClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
      }
    })

    checkAuth()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        })
        return true
      }
      return false
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Invalid credentials"
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
