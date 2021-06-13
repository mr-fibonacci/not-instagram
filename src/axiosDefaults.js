import axios from "axios";

axios.defaults.baseURL =
  "https://8000-blush-lungfish-onnqbqaa.ws-eu09.gitpod.io";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
