/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { axiosPrivate, axiosPublic } from "./axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  GenericResponse,
  IUser,
  LoginResponse,
  UserCred,
} from "../types/types";
import CryptoJS from "crypto-js";

interface AuthJwtPayload extends JwtPayload {
  email: string;
  name?: string | undefined;
  userid: string;
  initials?: string | undefined;
  fullname?: string | undefined;
  role?: string | undefined;
  username?: string | undefined;
}

export const login = async (userCred: UserCred): Promise<LoginResponse> => {
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_KEY);

  const encryptedBytes = CryptoJS.AES.encrypt(JSON.stringify(userCred), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedString = encryptedBytes.toString();

  const response: LoginResponse = await axiosPublic()
    .post<GenericResponse>("auth/login", { userCredentials: encryptedString })
    .then((response: AxiosResponse) => response?.data)
    .catch(() => {
      return {
        status: 0,
        message: "A aparut o eroare.",
      };
    });
  return response;
};

export const setAuth = (token: string): IUser => {
  localStorage.setItem("stackPortalToken", token);
  const user: IUser = {
    userID: jwtDecode<AuthJwtPayload>(token)?.userid,
    username: jwtDecode<AuthJwtPayload>(token)?.username,
    role: jwtDecode<AuthJwtPayload>(token)?.role,
    initials: jwtDecode<AuthJwtPayload>(token)?.initials,
    fullName: jwtDecode<AuthJwtPayload>(token)?.fullname,
    expiresIn: jwtDecode<AuthJwtPayload>(token)?.exp,
  };
  return user;
};

export const getAuth = (): IUser | undefined => {
  try {
    const token = localStorage.getItem("stackPortalToken");
    if (token !== null && token !== "") {
      const user: IUser = {
        userID: jwtDecode<AuthJwtPayload>(token)?.userid,
        username: jwtDecode<AuthJwtPayload>(token)?.username,
        role: jwtDecode<AuthJwtPayload>(token)?.role,
        initials: jwtDecode<AuthJwtPayload>(token)?.initials,
        fullName: jwtDecode<AuthJwtPayload>(token)?.fullname,
        expiresIn: jwtDecode<AuthJwtPayload>(token)?.exp,
      };
      return user;
    } else {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
};

export const logout = () => {
  localStorage.removeItem("stackPortalToken");
  return undefined;
};

export const forgotPassword = async (
  email: string
): Promise<GenericResponse> => {
  const response: GenericResponse = await axiosPublic()
    .post<GenericResponse>("auth/forgotPassword", email)
    .then((response: AxiosResponse) => response?.data)
    .catch(() => {
      return {
        status: 0,
        message: "A aparut o eroare.",
      };
    });
  return response;
};

export const resetPassword = async (
  newPassword: string,
  repeatNewPassword: string
): Promise<GenericResponse> => {
  const response: GenericResponse = await axiosPrivate()
    .post<GenericResponse>("auth/forgotPassword", {
      newPassword,
      repeatNewPassword,
    })
    .then((response: AxiosResponse) => response?.data)
    .catch(() => {
      return {
        status: 0,
        message: "A aparut o eroare.",
      };
    });
  return response;
};

export default {
  login,
  setAuth,
  getAuth,
  forgotPassword,
  resetPassword,
  logout,
};
