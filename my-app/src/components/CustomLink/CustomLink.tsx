import React from "react";
import styles from "./CustomLink.module.scss";
import { Link, useLocation } from "react-router-dom";

interface ICustomLink {
  children: React.ReactNode;
  to: string;
}

export function CustomLink({ children, to }: ICustomLink) {
  const location = useLocation();
  const match = location.pathname === to;

  return (
    <Link
      className={match ? styles.customLinkActive : styles.customLink}
      to={to}
    >
      {children}
    </Link>
  );
}
