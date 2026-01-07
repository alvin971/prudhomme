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
