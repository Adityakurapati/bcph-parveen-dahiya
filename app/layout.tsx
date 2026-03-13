import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Find Voting Slip - BCPH',
  description: 'Vote for PRIYA LEGHA - Bar Council Punjab & Haryana Election Campaign',
  generator: 'v0.app',

  icons: {
    icon: '/banner.png',
    apple: '/apple-icon.png',
  },

  openGraph: {
    title: 'Find Voting Slip - BCPH',
    description: 'Vote for PRIYA LEGHA - Bar Council Punjab & Haryana Election Campaign',
    url: 'https://votingslipbcph.in',
    siteName: 'BCPH Voting Slip',
    images: [
      {
        url: 'https://votingslipbcph.in/banner.png',
        width: 1200,
        height: 630,
        alt: 'BCPH Voting Slip',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Find Voting Slip - BCPH',
    description: 'Vote for PRIYA LEGHA - Bar Council Punjab & Haryana Election Campaign',
    images: ['https://votingslipbcph.in/banner.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}