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

export const useRedirect = () => {
  const history = useHistory();
  const handleMount = async () => {
    try {
      await axios.post("/dj-rest-auth/token/refresh/");
      history.goBack();
    } catch (err) {
      console.log(err.request);
    }
  };
  useEffect(() => {
    handleMount();
  });
};
