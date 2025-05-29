import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Syndicate ",
  
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/syndicate-logo.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/syndicate-logo.png", sizes: "180x180", type: "image/png" }
    ]
  },
  keywords: "AI, ML, technology, innovation, community, tech leaders, collaboration, projects",
  authors: [{ name: "Syndicate X Team" }],
  creator: "Syndicate X",
  publisher: "Syndicate X",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://syndicate-x.vercel.app',
    title: 'Syndicate X - Empowering Future Innovators',
    description: "Empowering the next generation of tech leaders through innovation and collaboration.",
    siteName: 'Syndicate X',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Syndicate X',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syndicate X - Empowering Future Innovators',
    description: "Empowering the next generation of tech leaders through innovation and collaboration.",
    images: ['/og-image.png'],
    creator: '@syndicatex',
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a8a" }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/syndicate-logo.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
