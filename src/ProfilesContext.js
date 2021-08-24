import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const ProfilesContext = createContext();
const SetProfilesContext = createContext();

export const useProfilesContext = () => useContext(ProfilesContext);
export const useSetProfilesContext = () => useContext(SetProfilesContext);

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FOLLOW":
      try {
        const { data } = await axios.post("/followers/", {
          followed: payload.id,
        });
      } catch (err) {
        console.log(err.request);
      }
      return state;
    case "UNFOLLOW":
      await axios.delete(`/followers/${payload.following_id}/`);
      return state;
    case "LOAD_FOLLOWING":
      return state;
    case "LOAD_FOLLOWED":
      return state;
    default:
      return state;
  }
};

export const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    profile: { results: [] },
    followingProfiles: { results: [] },
    followedProfiles: { results: [] },
    popularProfiles: { results: [] },
  });
  // const follow = () => {
  //   dispatch({type:  })
  // }
  return (
    <ProfilesContext.Provider value={profiles}>
      <SetProfilesContext.Provider value={setProfiles}>
        {children}
      </SetProfilesContext.Provider>
    </ProfilesContext.Provider>
  );
};
