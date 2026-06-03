import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans, Archivo_Black, Oswald } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { CartProvider } from '@/components/CartContext'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const archivoblack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dept. of Fragrance — 100% Authentic, 100% You',
  description: 'Authentic designer & niche fragrances. Lattafa, Afnan, Rasasi, Armaf, French Avenue and more. Sri Lanka\'s premier luxury perfume destination.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} ${dmSans.variable} ${archivoblack.variable} ${oswald.variable}`}
        style={{
          fontFamily: 'var(--font-dm-sans, "DM Sans", system-ui, sans-serif)',
        } as React.CSSProperties}
      >
        <CartProvider>
          <Nav />
          {children}
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  )
}
