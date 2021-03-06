import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";

export const useProfileRedirect = () => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        if (data?.profile_id?.toString() !== id) {
          history.goBack();
        }
      } catch (err) {
        console.log(err);
        history.goBack();
      }
    };

    handleMount();
  }, [history, id]);
};
