import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import PopularCourses from "@/components/popular-courses"
import TestimonialsSection from "@/components/testimonials-section"
import WhyHleduroom from "@/components/why-hleduroom"
import JoinNowCTA from "@/components/join-now-cta"
import NoticeSection from "@/components/ui/notice-section"
import { notices } from "@/lib/data/notices"

export default function HomePage() {
  const sortedNotices = notices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const noticesForHomePage = sortedNotices.slice(0, 5); // Show top 5 notices

  return (
    <main className="min-h-screen">
      <HeroSection />
      <NoticeSection notices={noticesForHomePage} viewAllLink="/notices"  />
      <FeaturesSection />
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <PopularCourses />
      </Suspense>
      <TestimonialsSection />
      <WhyHleduroom />
      <JoinNowCTA />
    </main>
  )
}
