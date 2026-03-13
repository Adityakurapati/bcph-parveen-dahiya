import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Find Voting Slip - Advocate Parveen Dahiya (Ms.) | BCPH',
  description:
    'Vote for Advocate Parveen Dahiya (Ms.) - Serial No. 127 | Bar Council of Punjab & Haryana Election Campaign. Vote for Progress, Integrity & Commitment.',

  generator: 'v0.app',

  icons: {
    icon: '/banner.png',
    apple: '/apple-icon.png',
  },

  openGraph: {
    title: 'Find Voting Slip - Advocate Parveen Dahiya (Ms.)',
    description:
      'Support Advocate Parveen Dahiya (Ms.) - Serial No. 127 | Bar Council of Punjab & Haryana Election. Vote for Progress, Integrity & Commitment.',
    url: 'https://bcph-parveen-dahiya.vercel.app',
    siteName: 'BCPH Voting Slip',
    images: [
      {
        url: 'https://bcph-parveen-dahiya.vercel.app/banner.png',
        width: 1200,
        height: 630,
        alt: 'Advocate Parveen Dahiya - Serial No. 127',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Find Voting Slip - Advocate Parveen Dahiya (Ms.)',
    description:
      'Vote for Advocate Parveen Dahiya (Ms.) - Serial No. 127 | Bar Council of Punjab & Haryana Election.',
    images: ['https://bcph-parveen-dahiya.vercel.app/banner.png'],
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