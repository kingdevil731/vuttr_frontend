import axios from "axios";

const api = axios.create({
  baseURL: "https://vuttrbackend0.herokuapp.com",
});

export default api;
