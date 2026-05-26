import { Contact } from "@/domain/entities/contact";
import { ContactRepository } from "@/application/ports/contact-repository";

export class ListInquiries {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.findMany();
  }
}
