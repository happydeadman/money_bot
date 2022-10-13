import React from "react";
import axios from "axios";
import "./App.css";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { useTypedSelector } from "./utils/hooks/useTypedSelector";
import { useActions } from "./utils/hooks/useActions";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";

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
          </Route>
        </Routes>

        <button
          type="button"
          onClick={() => {
            axios.get("http://localhost:3001/users/profile", {
              headers: { Authorization: `Bearer ${token}` },
            });
          }}
        >
          Проверить защищенный роут
        </button>
        <button
          type="button"
          onClick={() => {
            axios.get("http://localhost:3001/payments", {
              headers: { Authorization: `Bearer ${token}` },
            });
          }}
        >
          Проверить запрос данных
        </button>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
