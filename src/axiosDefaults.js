import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.baseURL = "https://moments-drf-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

const refreshAuthLogic = async (failedRequest) => {
  try {
    await axios.post(
      "/dj-rest-auth/token/refresh/",
      {},
      {
        skipAuthRefresh: true,
      }
    );
  } catch (err) {
    if (err.response.status === 401) {
      // redirect to login?
      // or Promise.reject()?
      console.log("intercepted!");
    }
  }
  return Promise.resolve();
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);
