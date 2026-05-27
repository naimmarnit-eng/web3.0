import { ContactRepository } from "@/application/ports/contact-repository";

export class MarkInquiryRead {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(id: string): Promise<void> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new Error("ไม่พบข้อความติดต่อ");
    }

    contact.isRead = true;
    await this.contactRepository.update(contact);
  }
}
