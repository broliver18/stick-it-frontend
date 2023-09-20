import { useState, useEffect, createContext } from "react";

export const AccountContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedIn");
    if (loggedInUser) {
      setUser({
        loggedIn: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export default UserProvider;
