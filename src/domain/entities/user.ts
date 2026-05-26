export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string | null;
  role: "ADMIN";
  createdAt: Date;
}
