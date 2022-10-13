import React from "react";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <a className={styles.link} href="https://t.me/wrongdead">
              Связаться со мной в Телеграм
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href="https://github.com/happydeadman?tab=repositories"
            >
              Мой GitHub
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
