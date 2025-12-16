'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-journey-purple/5 to-journey-blue/5">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-journey-purple mb-4">Oops!</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          We apologize for the inconvenience. Please try again or contact us if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="bg-journey-purple hover:bg-journey-dark-purple">
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
