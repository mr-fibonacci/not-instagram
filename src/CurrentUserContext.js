import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { axiosIntercept } from "./axiosDefaults";
import { useHistory } from "react-router-dom";

const CurrentUserContext = createContext();
const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const interceptor = axiosIntercept.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("inside interceptor, ERROR STATUS:", error.response.status);
        const config = error.config;
        console.log("ERROR CONFIG:", error.config);
        if (error.response.status === 401) {
          console.log("TROKL;ASDKFJASL;DKGJSL;ADHG;LASHDKLJFKL;SDF");
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            console.log("refreshed");
          } catch (err) {
            console.log("REFRESH TOKEN EXPIRED", err.request);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(config);
        }
        return Promise.reject(error);
      }
    );
    handleMount();
    return () => {
      axiosIntercept.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axiosIntercept.get("dj-rest-auth/user/");
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
