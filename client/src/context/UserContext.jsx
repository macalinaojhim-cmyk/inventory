import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
          credentials: "include"
        }
      );

      const data = await response.json();

      setIsLoggedIn(data.loggedIn);

    } catch (error) {

      console.error("Session check failed:", error);
      setIsLoggedIn(false);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,logout,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}