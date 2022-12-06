import React from "react";
import { IUserIncome } from "../../store/payments/payments.type";
import styles from "./Circle.module.scss";

interface ICircleProps {
  userId?: string;
  amount?: number;
}

export function Circle({ userId, amount }: ICircleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{userId}</div>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.text}>должен платить</div>
    </div>
  );
}
