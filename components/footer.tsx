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
              <span className="text-xl font-bold">H.L.-Eduroom</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Nepal's #1 platform for NEB & Entrance preparation with expert guidance and comprehensive study materials.
            </p>

            <div className="flex space-x-4">
              <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <Youtube className="h-5 w-5" />
              </a>
              <a href={socialMediaLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 2 22 2"/></svg>
              </a>
              <a href={socialMediaLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
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
                <Link href="/mock" className="text-gray-400 hover:text-white">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://hleduroom.blogspot.com/" className="text-gray-400 hover:text-white">
                  Blogspot
                </Link>
              </li>
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
          
          {/* --- ADDED CREDIT LINE --- */}
          <div className="text-gray-500 text-sm mt-4 md:mt-0">
            Made with 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mx-1 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            by &nbsp;
            <a 
              href="https://sajidaalam.com.np/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-white font-medium"
            >
               sajid(c0mrad1)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
