import { useState, useEffect, createContext } from "react";

export const AccountContext = createContext();

function HostProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedIn");
    if (loggedInUser) {
      setUser({
        loggedIn: true,
      })
    }
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export default HostProvider;