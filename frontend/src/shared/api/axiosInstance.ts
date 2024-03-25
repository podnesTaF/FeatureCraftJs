import axios from "axios";
import { NextApiRequest } from "next";
import { baseURL } from "../constants";
import { getTokenFromServerSideCookie } from "../lib";

export const createApiInstance = (req?: NextApiRequest) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (req) {
    // Server-side logic
    const token: string | null = getTokenFromServerSideCookie(req);
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
