import axios from "axios";

const api = axios.create({
  baseURL: "https://our-skcet.onrender.com",
});

export default api;
