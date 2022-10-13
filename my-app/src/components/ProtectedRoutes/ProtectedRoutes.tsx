import { Outlet } from "react-router-dom";
import { Login } from "../../pages/Login";
import { useAuth } from "../../utils/hooks/useAuth";

export const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Login />;
};
