import { Outlet, useNavigate } from "react-router-dom";
import { Login } from "../../pages/Login";
import { useAuth } from "../../utils/hooks/useAuth";

export const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return isAuth ? <Outlet /> : <Login />;
};
