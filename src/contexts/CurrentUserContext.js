import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";

const CurrentUserContext = createContext();
const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          console.log("refreshed the access token successfully");
        } catch (err) {
          console.log(err.request);
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          console.log("refresh token expired");
          return config;
        }
        return config;
      },
      (err) => {
        console.log("request interceptor error:");
        return Promise.reject(err);
      }
    );
    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error?.request);
        if (error?.response?.status === 401) {
          console.log("access token expired");
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            console.log("access token refreshed");
          } catch (err) {
            console.log("refresh token expired", err.request);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    handleMount();
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
