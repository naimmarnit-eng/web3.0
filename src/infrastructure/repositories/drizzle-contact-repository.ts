import { eq, desc } from "drizzle-orm";

import type { Contact } from "@/domain/entities/contact";
import type { ContactRepository } from "@/application/ports/contact-repository";

import { db } from "@/infrastructure/db/client";
import { contacts } from "@/infrastructure/db/schema";

export class DrizzleContactRepository implements ContactRepository {
  async create(contact: Contact): Promise<Contact> {
    await db.insert(contacts).values({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      message: contact.message,
      createdAt: contact.createdAt,
    });

    return contact;
  }

  async delete(id: string): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }

  async findById(id: string): Promise<Contact | null> {
    const result = await db.query.contacts.findFirst({
      where: eq(contacts.id, id),
    });

    return (result as Contact) ?? null;
  }

  async findMany(): Promise<Contact[]> {
    const results = await db.query.contacts.findMany({
      orderBy: [desc(contacts.createdAt)],
    });

    return results as Contact[];
  }
}
