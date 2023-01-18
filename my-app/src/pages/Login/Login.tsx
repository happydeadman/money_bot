import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EIcons, Icons } from "../../icons/Icons";
import { useActions } from "../../utils/hooks/useActions";
import Cookies from "universal-cookie";
import { ZodError, z } from "zod";
import { Loader } from "../../components/Loader";
import { useToast } from "@chakra-ui/react";
import styles from "./Login.module.scss";

const loginFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Логин должен быть больше 3-х символов" })
    .max(20, { message: "Логин не может превышать больше 20-и символов" }),
  password: z.string().min(3, { message: "Пароль должен больше 3-х символов" }),
});

const userSchema = z.object({
  username: z.string(),
  userId: z.string(),
  access_token: z.string(),
});

type UserLogin = z.infer<typeof loginFormSchema>;

const cookies = new Cookies();

export function Login() {
  const toast = useToast();

  const [user, setLoginUser] = useState<UserLogin>({ name: "", password: "" });
  const [errors, setErrors] = useState<
    z.ZodFormattedError<
      {
        password: string;
        name: string;
      },
      string
    >
  >({ _errors: [] });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useActions();
  const navigate = useNavigate();

  const onClickHandlerSignIn = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const validationResult = loginFormSchema.safeParse(user);

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      setLoading(false);
      setErrors(errors);
      console.log(errors);
    } else {
      setErrors({ _errors: [] });
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
          const fetchedUser = userSchema.parse(response.data);
          const { username, userId, access_token } = fetchedUser;
          cookies.set("token", access_token, { path: "/" });

          setUser({
            userName: username,
            userId: userId,
            token: access_token,
          });
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          if (error instanceof ZodError) {
            console.error("Ошибка валидации формы");
          }
          if (error.response.status === 406) {
            toast({
              title: "Неверный логин или пароль",
              description: "Пожалуйста, укажите верные данные",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
          throw error;
        });
    }
  };

  const onClickHandlerSignUp = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const validationResult = loginFormSchema.safeParse(user);

    if (!validationResult.success) {
      setLoading(false);
      const errors = validationResult.error.format();
      setErrors(errors);
    } else {
      setErrors({ _errors: [] });

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
              setLoading(false);
              const { username, userId } = response.data;
              cookies.set("token", response.data.access_token, {
                path: "/",
              });

              setUser({
                userName: username,
                userId: userId,
                token: response.data.access_token,
              });
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.data.message === "User already exists") {
            toast({
              title: "Такой пользователь уже существует",
              description: "Пожалуйста, придумайте другой логин",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
          throw error;
        });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.headig}>Войти в сервис</h2>
        <div className={styles.description}>
          Пожалуйста, войдите в сервис или зарегистрируйтесь
        </div>
        <div>
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
            {errors.name && (
              <span className={styles.error}>
                {errors.name._errors.join(", ")}
              </span>
            )}
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
            {errors.password && (
              <span className={styles.error}>
                {errors.password._errors.join(", ")}
              </span>
            )}
          </div>
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
      {loading && <Loader />}
    </div>
  );
}
