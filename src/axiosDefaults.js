import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.baseURL = "https://moments-drf-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosIntercept = axios.create();
axiosIntercept.defaults.baseURL = "https://moments-drf-api.herokuapp.com/";
axiosIntercept.defaults.headers.post["Content-Type"] = "multipart/form-data";
axiosIntercept.defaults.withCredentials = true;
