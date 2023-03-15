import axios from "axios";

const api = axios.create({
  baseURL: "https://our-psna-campus.onrender.com",
});

export default api;
