import axios, { AxiosInstance } from "axios";

const BASE_URL: string = import.meta.env.VITE_APP_API_URL;

export const axiosPublic = (): AxiosInstance =>
  axios.create({ baseURL: BASE_URL });

export const axiosPrivate = (): AxiosInstance => {
  const jwtToken: string | null = localStorage.getItem("stackPortalToken");
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
    },
  });
};

export default {
  axiosPublic,
  axiosPrivate,
};
