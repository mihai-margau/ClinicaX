import { AxiosResponse } from "axios";
import { axiosPublic, axiosPrivate } from "./axios";
import {
  Programare,
  GenericResponse,
  Interval,
  ProgramareTableRow,
  Statistica,
} from "../types/types";
import CryptoJS from "crypto-js";

export const programare = async (
  programare: Programare
): Promise<GenericResponse> => {
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_KEY);

  const encryptedBytes = CryptoJS.AES.encrypt(JSON.stringify(programare), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedString = encryptedBytes.toString();

  const response: GenericResponse = await axiosPublic()
    .post<GenericResponse>("programare", {
      programare: encryptedString,
    })
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        return {
          status: "0",
          message: "A apărut o eroare. Incercați mai tărziu.",
        };
      } else {
        return response?.data;
      }
    })
    .catch(() => {
      return {
        status: "0",
        message: "A apărut o eroare. Incercați mai tărziu.",
      };
    });
  return response;
};

export const intervale = async (
  dataProgramare: string
): Promise<Interval[]> => {
  const response: Interval[] = await axiosPrivate()
    .get<Interval[]>("intervale?dataProgramare=" + dataProgramare)
    .then((response: AxiosResponse) => response?.data)
    .catch(() => {
      return [];
    });
  return response;
};

export const getProgramari = async (
  data: string | null = null
): Promise<ProgramareTableRow[]> => {
  const response: ProgramareTableRow[] = await axiosPrivate()
    .post<GenericResponse>("getProgramari", {
      Data: data !== null ? data : "",
    })
    .then((response: AxiosResponse) => response?.data)
    .catch(() => {
      return [];
    });
  return response;
};

export const statistici = async (): Promise<Statistica[]> => {
  const response: Statistica[] = await axiosPrivate()
    .get<Interval[]>("getStatistici")
    .then((response: AxiosResponse) => response?.data)
    .catch(() => {
      return [];
    });
  return response;
};

export default {
  programare,
  intervale,
  getProgramari,
  statistici,
};
