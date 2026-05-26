import { ContactRepository } from "@/application/ports/contact-repository";

export class DeleteInquiry {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(id: string): Promise<void> {
    return this.contactRepository.delete(id);
  }
}
