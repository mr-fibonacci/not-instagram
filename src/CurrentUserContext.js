import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "./axiosDefaults";
import { useHistory } from "react-router-dom";

const CurrentUserContext = createContext();
const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const reqInterceptor = axiosReq.interceptors.request.use(async (config) => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
      } catch (err) {
        console.log(err.request);
        setCurrentUser((prevCurrentUser) => {
          if (prevCurrentUser) {
            history.push("/signin");
          }
          return null;
        });
      }
      return config;
    });
    const resInterceptor = axiosRes.interceptors.response.use(
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
      axiosReq.interceptors.response.eject(reqInterceptor);
      axiosRes.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
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
