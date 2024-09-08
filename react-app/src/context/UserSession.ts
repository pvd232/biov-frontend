export class UserSession {
  // Save the user ID to sessionStorage
  saveUserId = (id: string) => {
    sessionStorage.setItem("userId", id);
  };
  saveUserRole = (role: "admin" | "non-admin") => {
    sessionStorage.setItem("role", role);
  };

  // Retrieve the user ID from sessionStorage when the component mounts
  getUserId = () => {
    return sessionStorage.getItem("userId");
  };
  getUserRole = () => {
    return sessionStorage.getItem("role") as "admin" | "non-admin";
  };

  // Clear the user ID from sessionStorage
  clearUserId = () => {
    sessionStorage.removeItem("userId");
  };
  clearUserRole = () => {
    sessionStorage.removeItem("role");
  };
}
