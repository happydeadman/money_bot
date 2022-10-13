import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EIcons, Icons } from "../../icons/Icons";
import { User } from "./User";
import { Dropdown } from "../Dropdown";
import { useAuth } from "../../utils/hooks/useAuth";
import { useActions } from "../../utils/hooks/useActions";
import styles from "./Header.module.scss";

export function Header() {
  const { isAuth, userName } = useAuth();
  const { removeUser } = useActions();
  const navigate = useNavigate();

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
              <User name={userName} />
            </button>
          }
        >
          <button
            className={styles.btn}
            type="button"
            onClick={() => {
              axios
                .get("http://localhost:3001/users/logout", {
                  withCredentials: true,
                })
                .then((response) => {
                  removeUser();
                  navigate("/login");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Выйти
          </button>
        </Dropdown>
      )}
    </header>
  );
}
