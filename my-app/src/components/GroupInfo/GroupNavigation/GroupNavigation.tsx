import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./GroupNavigation.module.scss";
import { CustomLink } from "../../CustomLink";

export function GroupNavigation() {
  const { id } = useParams();
  return (
    <nav className={styles.nav}>
      <CustomLink to={`/group/${id}/join`}>Транзакции</CustomLink>
      <CustomLink to={`/group/${id}/members`}>Участники</CustomLink>
    </nav>
  );
}
