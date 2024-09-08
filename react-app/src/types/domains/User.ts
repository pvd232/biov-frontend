export interface User {
  id: string;
  password: string;
  role: "admin" | "non-admin";
}
