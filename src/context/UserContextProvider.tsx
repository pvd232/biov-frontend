import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContextProviderProps } from "../types/context/UserContextProviderProps";
import { UserContextType } from "../types/context/UserContextType";
import { User } from "../types/domains/User";
import { UserSession } from "./UserSession";

// Create the UserContext with default values
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Define the UserProvider component
export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<"admin" | "non-admin" | null>(null);

  const login = (user: User) => {
    logout();
    setUserId(user.id);
    setRole(user.role);
    new UserSession().saveUserId(user.id);
    new UserSession().saveUserRole(user.role);
  };

  const logout = () => {
    setUserId(null);
    setRole("non-admin");
    new UserSession().clearUserId();
  };

  useEffect(() => {
    const userId = new UserSession().getUserId();
    const role = new UserSession().getUserRole(); // Would not do this in production app
    if (userId) setUserId(userId);
    if (role) setRole(role);
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, role, setRole, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
