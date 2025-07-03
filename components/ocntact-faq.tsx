import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"
import { faqs } from "@/lib/data/faq"
import { address, officeHour, socialMediaLinks } from "@/lib/data/social-media"


export default function ContactFAQ() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
            <p className="text-gray-600">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-blue-800 text-sm">
              Our support team is here to help you with any questions or concerns.
            </p>

            <div className="space-y-3">
              <a
                href={socialMediaLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </a>

              <a href={`tel:${socialMediaLinks.phoone}`} className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Call Now
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>More Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/faq" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Complete FAQ Section
              </Button>
            </Link>

            <Link href="/courses" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Browse All Courses
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Office Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 text-sm mb-3">
              Schedule a free consultation at our office to discuss your academic goals.
            </p>
            <p className="text-yellow-800 font-medium text-sm">
              📍 {address}
              <br />🕒 Sun-Fri: {officeHour}
              <br />📞 {socialMediaLinks.phoone}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
