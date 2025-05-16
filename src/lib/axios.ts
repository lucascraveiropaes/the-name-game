import Cookies from "js-cookie";
import axios from "axios";

export const client = axios.create({ baseURL: "/api", });

client.interceptors.request.use((config) => {
  const token = Cookies.get("game-token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});