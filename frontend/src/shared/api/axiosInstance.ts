import axios from "axios";
import { baseURL } from "../constants";

export const createApiInstance = (token?: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (token) {
    if (token) {
      instance.interceptors.request.use(
        (config: any) => {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }

  return instance;
};
