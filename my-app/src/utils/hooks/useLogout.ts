import Cookies from "universal-cookie";
import { useActions } from "./useActions";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

export function useLogout() {
  const { removeUser } = useActions();
  const navigate = useNavigate();
  return () => {
    cookies.remove("token", { path: "/" });
    removeUser();
    navigate("/login");
  };
}
