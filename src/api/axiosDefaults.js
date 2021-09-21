import axios from "axios";

axios.defaults.baseURL = "https://moments-drf-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
axiosReq.defaults.baseURL = "https://moments-drf-api.herokuapp.com/";
axiosReq.defaults.headers.post["Content-Type"] = "multipart/form-data";
axiosReq.defaults.withCredentials = true;

export const axiosRes = axios.create();
axiosRes.defaults.baseURL = "https://moments-drf-api.herokuapp.com/";
axiosRes.defaults.headers.post["Content-Type"] = "multipart/form-data";
axiosRes.defaults.withCredentials = true;
