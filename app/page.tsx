import FeaturesSection from "@/components/features-section"
import HeroSection from "@/components/hero-section"
import HomePageNoticeSection from "@/components/home/home-page-notice-section"
import JoinNowCTA from "@/components/join-now-cta"
import PopularCoursesSkeleton from "@/components/popular-course-skeleton"
import PopularCourses from "@/components/popular-courses"
import TestimonialsSection from "@/components/testimonials-section"
import WhyHleduroom from "@/components/why-hleduroom"
import { Suspense } from "react"

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
