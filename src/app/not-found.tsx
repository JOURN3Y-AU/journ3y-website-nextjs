import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-9xl font-bold text-journey-purple mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-journey-purple hover:bg-journey-dark-purple">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
