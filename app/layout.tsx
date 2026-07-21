import type React from "react"
import type { Metadata } from "next"
import { Roboto, Roboto_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })
const _robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Found and Loved Safe Home -   Make a real Difference",
  description:
    "Found and Loved Safe Home is dedicated to providing a safe haven for those in need.",
  generator: "v0.app",
  openGraph: {
    title: "Found and Loved Safe Home",
    description: "Make a real Difference",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased ${_roboto.className} ${_robotoCondensed.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
