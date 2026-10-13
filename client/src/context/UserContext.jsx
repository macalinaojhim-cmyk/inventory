import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  async function login(form) {

    const formData = new FormData(form);

    try {

      const response = await fetch(
        "http://localhost/inventory/server/login.php",
        {
          method: "POST",
          body: formData,
          credentials: "include"
        }
      );

      const data = await response.json();

      if (data.success) {
        setUser(data.user?.username ?? "");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        alert(data.message);
      }

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function logout() {
    await fetch(
      "http://localhost/inventory/server/logout.php",
      {
        credentials: "include"
      }
    );

    setUser("");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
  try {
    const response = await fetch(
      "http://localhost/inventory/server/checkSession.php",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("Logged in:", data.loggedIn);
console.log("Username from PHP:", data.user?.username);

setIsLoggedIn(data.loggedIn);
setUser(data.loggedIn ? data.user?.username ?? "" : "");

    console.log("Session response:", data);

    setIsLoggedIn(data.loggedIn);
    setUser(data.loggedIn ? data.user?.username ?? "" : "");
  } catch (error) {
    console.error("Session check failed:", error);
    setIsLoggedIn(false);
    setUser("");
  } finally {
    setLoading(false);
  }
}
console.log("UserContext username:", user);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,logout,
        loading,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
}