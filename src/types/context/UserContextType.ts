import { User } from "../domains/User";
export interface UserContextType {
  userId: string | null;
  login: (user: User) => void;
  logout: () => void;
}
