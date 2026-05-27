import { Contact } from "@/domain/entities/contact";
import { CreateContactInput } from "@/application/dto/contact.dto";
import { ContactRepository } from "@/application/ports/contact-repository";

export class CreateInquiry {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(input: CreateContactInput): Promise<Contact> {
    const contact: Contact = {
      id: crypto.randomUUID(),
      name: input.name,
      phone: input.phone || null,
      email: input.email || null,
      message: input.message,
      isRead: false, // Initialized as unread
      createdAt: new Date(),
    };

    return this.contactRepository.create(contact);
  }
}
