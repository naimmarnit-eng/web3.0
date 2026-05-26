export interface Contact {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  createdAt: Date;
}
