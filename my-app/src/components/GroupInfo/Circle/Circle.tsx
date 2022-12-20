import React from "react";
import styles from "./Circle.module.scss";

interface ICircleProps {
  userId?: string;
  amount?: number;
  currency?: string;
}
//resolve empty props
export function Circle({ userId, amount, currency }: ICircleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{userId}</div>
      <div className={styles.amount}>{`${currency} ${amount}`}</div>
      <div className={styles.text}>должен платить</div>
    </div>
  );
}
