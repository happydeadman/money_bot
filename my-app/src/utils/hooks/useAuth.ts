import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useActions } from "./useActions";
import { useEffect } from "react";

const cookie = new Cookies();

export function useAuth() {
  const { setUser } = useActions();
  const token = cookie.get("token");

  useEffect(() => {
    if (token) {
      const { username, sub }: any = jwt(token);
      setUser({
        userName: username,
        userId: sub,
        token: token,
      });
    }
  }, [setUser, token]);

  return {
    isAuth: !!token,
  };
}
