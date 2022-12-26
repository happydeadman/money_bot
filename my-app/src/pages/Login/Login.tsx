import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EIcons, Icons } from "../../icons/Icons";
import { useActions } from "../../utils/hooks/useActions";
import Cookies from "universal-cookie";
import styles from "./Login.module.scss";

interface IUserLogin {
  name: string;
  password: string;
}
const cookies = new Cookies();

export function Login() {
  const [user, setLoginUser] = useState<IUserLogin>({ name: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useActions();
  const navigate = useNavigate();

  const onClickHandlerSignIn = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    axios
      .post(
        "http://localhost:3001/users/login",
        {
          username: user.name,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With",
          },
        }
      )
      .then((response) => {
        const { username, sub } = response.data;
        cookies.set("token", response.data.access_token, { path: "/" });
        setUser({
          userName: username,
          userId: sub,
          token: response.data.access_token,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickHandlerSignUp = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    axios
      .post(
        "http://localhost:3001/users/signup",
        {
          username: user.name,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With",
          },
        }
      )
      .then((response) => {
        axios
          .post(
            "http://localhost:3001/users/login",
            {
              username: user.name,
              password: user.password,
            },
            {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers":
                  "Content-Type, Authorization, X-Requested-With",
              },
            }
          )
          .then((response) => {
            const { username, sub } = response.data;
            setUser({
              userName: username,
              userId: sub,
              token: response.data.access_token,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.headig}>Войти в сервис</h2>
        <div className={styles.description}>
          Пожалуйста, войдите в сервис или зарегистрируйтесь
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            autoComplete="username"
            placeholder="Ваше имя"
            name="name"
            id="name"
            onChange={(e) => setLoginUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Пароль"
            id="password"
            onChange={(e) =>
              setLoginUser({ ...user, password: e.target.value })
            }
            value={user.password}
          />
          <button
            className={styles.showPassword}
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Icons name={EIcons.show} />
          </button>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.btn}
            type="button"
            onClick={(e) => {
              onClickHandlerSignIn(e);
            }}
          >
            Авторизация
          </button>
          <button
            className={styles.btn}
            type="button"
            onClick={(e) => {
              onClickHandlerSignUp(e);
            }}
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
}
