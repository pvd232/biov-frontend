import { User } from "../domains/User";
export interface UserContextType {
  userId: string | null;
  role: "admin" | "non-admin" | null;
  setRole: (role: "admin" | "non-admin") => void;
  login: (user: User) => void;
  logout: () => void;
}
