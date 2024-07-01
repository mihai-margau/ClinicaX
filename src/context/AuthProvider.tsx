import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "../types/types";
import authAPI from "../api/authAPI";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  auth?: IUser;
  setAuth: (auth?: IUser) => void;
};

const initialValue: IAuthContext = {
  auth: undefined,
  setAuth: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(() => {
    const auth = authAPI.getAuth();
    if (auth) return auth;
    else return initialValue.auth;
  });
  useEffect(() => {
    if (auth) {
      const timer = auth?.expiresIn;
      if (timer) {
        if (timer * 1000 < Date.now()) {
          const response = authAPI.logout();
          setAuth(response);
        } else {
          const expirationTime = timer * 1000 - new Date().getTime();
          const checkTokenExpirationTimer = setTimeout(() => {
            const response = authAPI.logout();
            setAuth(response);
          }, expirationTime);
          return () => {
            clearTimeout(checkTokenExpirationTimer);
          };
        }
      } else {
        const response = authAPI.logout();
        setAuth(response);
      }
    }
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
