import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

// export const useRefreshToken = () => {
//   const history = useHistory();
//   // const axiosDontIntercept = axios.create();

//   useEffect(() => {
//     console.log("mounting an interceptor");
//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const config = error.config;
//         if (error.response.status === 401 && !config._retry) {
//           config._retry = true;
//           // potential loop?
//           await axios.post("/dj-rest-auth/token/refresh/");
//           console.log("refreshed the token :D");
//           return axios(config);
//         }
//         console.log("history push");
//         history.push("/signin");
//         console.log("interceptor error", error);
//         return Promise.reject(error);
//       }
//     );

//     // interceptor cleanup
//     return () => {
//       console.log("unmounting the interceptor");
//       axios.interceptors.response.eject(interceptor);
//     };
//   }, []);
// };
