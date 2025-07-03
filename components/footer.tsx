import Link from "next/link"
import { BookOpen, Facebook, Instagram, Youtube, Twitter, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { address, email, socialMediaLinks } from "@/lib/data/social-media"
import { allCourses } from "@/lib/data/courses"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Hleduroom</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Nepal's #1 platform for NEB & Entrance preparation with expert guidance and comprehensive study materials.
            </p>

            <div className="flex space-x-4">
              <a href={socialMediaLinks.facebook} className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={socialMediaLinks.instagram} className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={socialMediaLinks.youtube} className="text-gray-400 hover:text-blue-400">
                <Youtube className="h-5 w-5" />
              </a>
              <a href={socialMediaLinks.twitter} className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="text-gray-400 hover:text-white">
                  Mock Tests
                </Link>
              </li>
              {/* <li>
                <Link href="/instructors" className="text-gray-400 hover:text-white">
                  Instructors
                </Link>
              </li> */}
              {/* <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li> */}
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              {allCourses.map((course) => (
                <li key={course.id}>
                  <Link href={`/courses/${course.id}`} className="text-gray-400 hover:text-white">
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">{socialMediaLinks.phoone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">{address}</span>
              </div>
              <a
                href={socialMediaLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-400 hover:text-green-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Hleduroom. All rights reserved.</p>
          {/* <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/refund" className="text-gray-400 hover:text-white text-sm">
              Refund Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
