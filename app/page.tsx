import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import PopularCourses from "@/components/popular-courses"
import TestimonialsSection from "@/components/testimonials-section"
import WhyHleduroom from "@/components/why-hleduroom"
import JoinNowCTA from "@/components/join-now-cta"
import NoticeSection from "@/components/ui/notice-section"
import { notices } from "@/lib/data/notices"
import HomePageNoticeSection from "@/components/home/home-page-notice-section"
import PopularCoursesSkeleton from "@/components/popular-course-skeleton"

export default function HomePage() {

  return (
    <main className="min-h-screen">
      <HeroSection />
      <HomePageNoticeSection />
      <FeaturesSection />
      <Suspense fallback={<PopularCoursesSkeleton />}>
        <PopularCourses />
      </Suspense>
      <TestimonialsSection />
      <WhyHleduroom />
      <JoinNowCTA />
    </main>
  )
}
