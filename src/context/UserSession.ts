export class UserSession {
  // Save the user ID to sessionStorage
  saveUserId = (id: string) => {
    sessionStorage.setItem("userId", id);
  };

  // Retrieve the user ID from sessionStorage when the component mounts
  getUserId = () => {
    return sessionStorage.getItem("userId");
  };
  // Clear the user ID from sessionStorage
  clearUserId = () => {
    sessionStorage.removeItem("userId");
  };
}
