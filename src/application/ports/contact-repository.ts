import type { Contact } from "@/domain/entities/contact";

export interface ContactRepository {
  create(contact: Contact): Promise<Contact>;
  update(contact: Contact): Promise<Contact>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Contact | null>;
  findMany(): Promise<Contact[]>;
}
