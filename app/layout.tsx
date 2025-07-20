import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "H.L.-Eduroom - #1 NEB & Entrance Preparation Platform",
  description:
    "Join the leading NEB & Entrance preparation platform with live classes, mock tests, expert tutors, and comprehensive study materials.",
  keywords: "NEB preparation, entrance exam, MBBS, CEE, mock tests, live classes, Nepal education",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
