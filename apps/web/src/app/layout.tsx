import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Playfair_Display, Great_Vibes } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: 'Heirloom | Preserve Your Family Legacy',
  description: 'Capture, preserve, and share your family stories for generations to come. Your life is a story worth telling.',
  keywords: ['family stories', 'legacy', 'memories', 'family history', 'storytelling', 'video memories'],
  openGraph: {
    title: 'Heirloom | Preserve Your Family Legacy',
    description: 'Capture, preserve, and share your family stories for generations to come.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
