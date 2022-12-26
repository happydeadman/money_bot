import React, { MouseEvent } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { EIcons, Icons } from "../../icons/Icons";
import { User } from "./User";
import { Dropdown } from "../Dropdown";
import { useAuth } from "../../utils/hooks/useAuth";
import { useActions } from "../../utils/hooks/useActions";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import styles from "./Header.module.scss";

const cookies = new Cookies();

export function Header() {
  const { isAuth } = useAuth();
  const { userName } = useTypedSelector((state) => state.user);
  const { removeUser } = useActions();
  const navigate = useNavigate();
  const logoutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get("http://localhost:3001/users/logout", {
        withCredentials: true,
      })
      .then((response) => {
        cookies.remove("token", { path: "/" });
        removeUser();
        navigate("/login");
      })
      .catch((error) => {
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
    </header>
  );
}
