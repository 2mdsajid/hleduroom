import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import ContactMap from "@/components/contact-map"
import ContactFAQ from "@/components/ocntact-faq"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Hleduroom",
  description:
    "Get in touch with Hleduroom for any questions about our courses, support, or admissions. We're here to help you succeed.",
  keywords: "contact hleduroom, support, help, admission inquiry, course information",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We're here to help you succeed in your academic journey. Reach out to us anytime!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <ContactMap />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <ContactFAQ />
        </div>
      </div>
    </main>
  )
}
