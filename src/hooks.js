import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "./axiosDefaults";

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

export const useRedirect = (redirectUnauthenticated = true) => {
  const history = useHistory();
  const handleMount = async () => {
    try {
      await axios.post("/dj-rest-auth/token/refresh/");
      if (!redirectUnauthenticated) {
        history.goBack();
      }
    } catch (err) {
      console.log(err.request);
      if (redirectUnauthenticated) {
        history.goBack();
      }
    }
  };
  useEffect(() => {
    handleMount();
  }, []);
};

export const useProfileRedirect = () => {
  const { id } = useParams();
  const history = useHistory();
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      if (data?.profile_id?.toString() !== id) {
        history.goBack();
      }
    } catch (err) {
      console.log(err.request);
      history.goBack();
    }
  };
  useEffect(() => {
    handleMount();
  }, []);
};
