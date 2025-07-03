import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Headphones,
  Users,
} from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Primary Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-blue-600" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-gray-600">+977 98-76543210</p>
              <p className="text-gray-600">+977 01-4567890</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">info@hleduroom.com</p>
              <p className="text-gray-600">support@hleduroom.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <p className="text-gray-600">
                Putalisadak, Kathmandu
                <br />
                Nepal - 44600
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Office Hours</p>
              <p className="text-gray-600">
                Sunday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Support */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-4">Get instant support and quick answers to your questions via WhatsApp.</p>
          <a
            href="https://wa.me/9779876543210?text=Hi, I need help with Hleduroom courses"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Department Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Department Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Admissions</p>
              <p className="text-gray-600 text-sm">admission@hleduroom.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Headphones className="h-4 w-4 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Technical Support</p>
              <p className="text-gray-600 text-sm">tech@hleduroom.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Course Counseling</p>
              <p className="text-gray-600 text-sm">counselor@hleduroom.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Stay connected for updates and tips</p>
          <div className="flex space-x-3">
            <a href="#" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 text-sm mb-2">For urgent technical issues during exams or live classes:</p>
          <p className="font-semibold text-red-800">+977 98-11111111</p>
          <p className="text-red-600 text-xs mt-1">Available 24/7 during exam periods</p>
        </CardContent>
      </Card>
    </div>
  )
}
