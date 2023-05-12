import React, { createContext, useState } from "react";

const UserContext = createContext({
    userId: undefined,
    setUserId: (userId) => {}
});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(undefined);

  const context = {
    userId: userId,
    setUserId: (id) => {setUserId(id)}
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
