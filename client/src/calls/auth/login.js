import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const login = async () => await instance.get("/auth/google");

export default login;
