// import React, {
//   createContext,
//   useContext,
//   useReducer,
//   useEffect,
//   useState,
// } from "react";
// import axios from "axios";
// import { refreshToken } from "./utils";

// const PopularProfilesContext = createContext();
// const SetPopularProfilesContext = createContext();

// export const usePopularProfilesContext = () =>
//   useContext(PopularProfilesContext);
// export const useSetPopularProfilesContext = () =>
//   useContext(SetPopularProfilesContext);

// export const PopularProfilesContextProvider = ({ children }) => {
//   const [popularProfiles, setPopularProfiles] = useState({ results: [] });
//   useEffect(() => {
//     handleMount();
//   }, []);
//   const handleMount = async () => {
//     // refreshToken
//     await refreshToken();
//     try {
//       const { data } = await axios.get("/profiles?ordering=-followers_count");
//       setPopularProfiles(data);
//     } catch (err) {
//       console.log(err.request);
//     }
//   };
//   return (
//     <PopularProfilesContext.Provider value={popularProfiles}>
//       <SetPopularProfilesContext.Provider value={setPopularProfiles}>
//         {children}
//       </SetPopularProfilesContext.Provider>
//     </PopularProfilesContext.Provider>
//   );
// };
