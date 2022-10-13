import React from "react";
import styles from "./User.module.scss";

type TUser = {
  name: string | undefined;
};

export function User({ name }: TUser) {
  return (
    <div className={styles.userBlock}>
      <span className={styles.userName}>{name}</span>
    </div>
  );
}
