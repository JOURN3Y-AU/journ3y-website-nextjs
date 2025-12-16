'use client'

import { useAnnouncement } from '@/hooks/useAnnouncement'
import AnnouncementOverlay from '@/components/AnnouncementOverlay'

export default function AnnouncementWrapper() {
  const { showAnnouncement, dismissAnnouncement, loading } = useAnnouncement()

  if (loading) return null

  return (
    <AnnouncementOverlay
      isOpen={showAnnouncement}
      onClose={dismissAnnouncement}
    />
  )
}
