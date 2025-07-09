import { Button } from "@/components/ui/button"
import { socialMediaLinks } from "@/lib/data/social-media"
import { Play, Users, BookOpen, Award, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Join the <span className="text-blue-600">#1 NEB</span> & Entrance Preparation Platform
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Master your NEB, CEE, and MBBS entrance exams with our comprehensive platform featuring live classes,
              expert tutors, and proven study materials.
            </p>

            {/* Key Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Live Classes</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Mock Tests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Expert Tutors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Study Notes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-900">
                  Free Resources
                </Button>
              </Link>
              {/* <a
                href={'https://chat.whatsapp.com/Esup9YY4R3xGVM20QFI372'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Group
                </Button>
              </a> */}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Expert Tutors</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <a href="https://youtube.com/@h.l.eduroom" target="_blank" rel="noopener noreferrer" className="relative z-10 block">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hleduroom YouTube Channel"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-full bg-blue-500 flex items-center justify-center w-20 h-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white opacity-75 hover:opacity-90"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-lg z-20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Live Class Active</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">98%</div>
                <div className="text-xs text-gray-600">Test Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
