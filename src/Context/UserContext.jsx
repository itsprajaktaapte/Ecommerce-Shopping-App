import { createContext, useContext, useState } from "react";

//Create Context

const UserContext = createContext();

// create provider and export context

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username});
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// create custom hook to use context

export const useUser = () => useContext(UserContext);
