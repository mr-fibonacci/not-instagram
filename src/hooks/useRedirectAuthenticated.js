import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const useRedirectAuthenticated = (redirectAuthenticated) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (redirectAuthenticated) {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
        if (!redirectAuthenticated) {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, redirectAuthenticated]);
};
