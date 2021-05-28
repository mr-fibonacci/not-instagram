import axios from "axios";

axios.defaults.baseURL =
  "https://8000-blush-lungfish-onnqbqaa.ws-eu08.gitpod.io";
// axios.defaults.baseURL = 'https://infinite-thicket-41861.herokuapp.com/'
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
