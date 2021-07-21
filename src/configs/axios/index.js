import axios from "axios";
import errorHandler from "./errorHandler";

// https://github.com/axios/axios#creating-an-instance
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/`,
});

// https://github.com/axios/axios#interceptors
instance.interceptors.response.use((response) => response.data, errorHandler);

export default instance;
