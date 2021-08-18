import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CurrentUserContext = createContext();
const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    handleMount();
  }, []);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      console.log("current User:", data);
      setCurrentUser(data);
    } catch (err) {
      console.log(err.request);
    }
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
