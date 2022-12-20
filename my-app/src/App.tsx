import axios from "axios";
import "./App.css";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useTypedSelector } from "./utils/hooks/useTypedSelector";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import { Payments } from "./pages/Payments";

axios.defaults.withCredentials = true;

function App() {
  const { token } = useTypedSelector((state) => state.user);

  return (
    <>
      <Layout>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/group/:id/:action" element={<Payments />} />
          </Route>
        </Routes>

        <Footer />
      </Layout>
    </>
  );
}

export default App;
