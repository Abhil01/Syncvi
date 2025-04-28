import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // backend URL
});

export const signup = (username, password) =>
  API.post("/auth/signup", { username, password });

export const login = (username, password) =>
  API.post("/auth/login", { username, password });
