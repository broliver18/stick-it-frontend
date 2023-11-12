import { useState, useEffect, createContext } from "react";

export const AccountContext = createContext();

function HostProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false, username: "" });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedIn");
    const username = localStorage.getItem("username");
    if (loggedInUser) {
      setUser({
        loggedIn: true,
        username,
      });
    }
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export default HostProvider;
