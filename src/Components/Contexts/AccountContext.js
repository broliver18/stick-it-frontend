import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export const AccountContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/auth/login", {
      credentials: "include",
    })
      .catch((error) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        navigate("/host");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export default UserProvider;
