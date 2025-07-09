import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { address, socialMediaLinks } from "@/lib/data/social-media"
import { MapPin, Navigation } from "lucide-react"

export default function ContactMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Find Us
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Map Placeholder - In production, you'd integrate with Google Maps or similar */}
            <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=320&width=600"
                alt="Hleduroom Office Location Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Hleduroom Office</p>
                  <p className="text-sm text-gray-600">{address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">

            <div className="pt-4">
              <a
                href={`https://maps.google.com/?q=${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Navigation className="h-4 w-4 mr-1" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
