import React from "react";
import { useGetPaymentsQuery } from "../../store/payments/payments.api";
import styles from "./Home.module.scss";

export function Home() {
  const { data, isLoading, isError } = useGetPaymentsQuery(2);
  return (
    <main className={styles.main}>
      <div>
        side menu
        <ul>
          <li>show all payments</li>
          <li>add payment</li>
        </ul>
      </div>
      <div>
        {data &&
          data.map((payment) => {
            return (
              <li key={payment._id}>
                {payment.name} - {payment.amount}
              </li>
            );
          })}
      </div>
    </main>
  );
}
