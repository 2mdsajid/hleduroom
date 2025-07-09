// In /components/dashboard/ContactsList.tsx
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/generated/prisma";


export const ContactsList = ({ contacts }: { contacts: Contact[] }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Contact Messages</h2>
    {contacts.length > 0 ? (
      contacts.map((contact) => (
        <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg text-gray-900">{contact.subject}</p>
              <p className="text-sm text-gray-500">
                From: <span className="font-medium text-gray-700">{contact.name}</span> ({contact.email})
              </p>
              <p className="text-sm text-gray-500">
                Inquiry: <span className="font-medium text-gray-700">{contact.category}</span>
                {contact.phone && ` | Phone: ${contact.phone}`}
              </p>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(contact.createdAt).toLocaleString()}
            </div>
          </div>
          <p className="mt-4 text-gray-800 bg-gray-50 p-4 rounded-md border">{contact.message}</p>

        </div>
      ))
    ) : (
      <p className="text-gray-500 mt-4">No contact messages found.</p>
    )}
  </div>
);