import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

const getItems = async () => {
  const items = await instance.get("/items");
  return items;
};

export default getItems;
