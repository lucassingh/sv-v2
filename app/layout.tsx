import type { Metadata } from 'next'
import { DM_Serif_Display, Roboto_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/components/providers/i18n-provider'
import './globals.css'

/** Debe coincidir con `fontCssVarNames` en `theme/theme.ts` (Next/font exige literales aquí). */
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
})

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'A. C. Sembrando Valores',
  description:
    'Sembrando Valores — escuela de fútbol, vóley y juegos, espacio Peques, preadolescentes e infraestructura. Venado Tuerto, Santa Fe.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSerif.variable} ${robotoCondensed.variable}`}>
      <body className="font-sans antialiased bg-white">
        <I18nProvider>{children}</I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
