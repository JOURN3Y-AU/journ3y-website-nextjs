import { Metadata } from 'next'
import AIMonitorClient from './AIMonitorClient'

export const metadata: Metadata = {
  title: 'AI Visibility Monitor | Admin',
  description: 'Monitor JOURN3Y visibility across AI platforms',
}

export default function AIMonitorPage() {
  return <AIMonitorClient />
}
