'use server'


import { Contact } from "@/lib/generated/prisma"
import prisma from "../db"

export async function createContact(data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const contact = await prisma.contact.create({
      data,
    })

    return { success: true, data: contact }
  } catch (error) {
    console.error("Error creating contact:", error)
    return { success: false, error: "Failed to create contact" }
  }
}


export async function getAllContacts() {
  try {
    const contacts = await prisma.contact.findMany()
    return contacts
  } catch (error) {
    console.error("Error getting contacts:", error)
    return []
  }
}
