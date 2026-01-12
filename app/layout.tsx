import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { DocumentsProvider } from '@/lib/contexts/DocumentsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PRUDHOMME - Assistance Juridique IA',
  description: 'Plateforme d\'accès à la justice assistée par intelligence artificielle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#1E3A8A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <DocumentsProvider>
            {children}
          </DocumentsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
