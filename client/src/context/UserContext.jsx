import { createContext, useEffect, useState, } from "react";

export const UserContext = createContext();

export function UserProvider({children}){
    const [login, setLogin] = useState(false);

    return (
        <UserContext.Provider value={{
          login
        }}>
          {children}
        </UserContext.Provider>
      );
}