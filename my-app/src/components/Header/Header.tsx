import React, { MouseEvent, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EIcons, Icons } from "../../icons/Icons";
import { User } from "./User";
import { Dropdown } from "../Dropdown";
import { useAuth } from "../../utils/hooks/useAuth";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import styles from "./Header.module.scss";
import { Loader } from "../Loader";
import { useToast } from "@chakra-ui/react";
import { useLogout } from "../../utils/hooks/useLogout";

export function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuth } = useAuth();
  const toast = useToast();
  const { userName } = useTypedSelector((state) => state.user);
  const logout = useLogout();

  const logoutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get("http://localhost:3001/users/logout", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        logout();
      })
      .catch((error) => {
        toast({
          title: "Что-то пошло не так",
          description: "Пожалуйста, попробуйте позже",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <Icons name={EIcons.logo} />
        </Link>
      </div>
      {!isAuth && (
        <nav>
          <ul>
            <li>
              <Link className={styles.link} to="/login">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {isAuth && (
        <Dropdown
          button={
            <button>
              <User name={userName ? userName : "jopa"} />
            </button>
          }
        >
          <button
            className={styles.btn}
            type="button"
            onClick={(e) => {
              logoutHandler(e);
            }}
          >
            Выйти
          </button>
        </Dropdown>
      )}
      {isLoading && <Loader />}
    </header>
  );
}
