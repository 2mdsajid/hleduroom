import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function JoinNowCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Success Journey?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of successful students and achieve your academic goals with our expert guidance and
          comprehensive study materials.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/courses">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
              Browse Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <a
            href="https://wa.me/9779876543210?text=Hi, I want to know more about Hleduroom courses"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 w-full bg-transparent"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>

        <div className="mt-8 text-blue-100 text-sm">
          <p>🎯 Free demo available • 💰 Money-back guarantee • 📞 24/7 support</p>
        </div>
      </div>
    </section>
  )
}
