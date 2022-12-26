import axios from "axios";
import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import { Payments } from "./pages/Payments";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      {mounted && (
        <Layout>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/group/:id/:action" element={<Payments />} />
              </Route>
            </Routes>

            <Footer />
          </BrowserRouter>
        </Layout>
      )}
    </>
  );
}

export default App;
