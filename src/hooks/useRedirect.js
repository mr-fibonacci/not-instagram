import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const useRedirect = (redirectUnauthenticated = true) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (!redirectUnauthenticated) {
          history.goBack();
        }
      } catch (err) {
        console.log(err);
        if (redirectUnauthenticated) {
          history.goBack();
        }
      }
    };

    handleMount();
  }, [history, redirectUnauthenticated]);
};
