import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import { IGroups } from "../../../store/groups/groups.type";
import { generateRandomString } from "../../../utils/js/generateRandomString";
import { useGetPaymentsQuery } from "../../../store/payments/payments.api";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import styles from "./NewMemberForm.module.scss";

export interface IMemberForm extends IGroups {
  handleClose: () => void | null;
}

export function NewMemberForm({
  currency,
  _id,
  users,
  name,
  handleClose,
}: IMemberForm) {
  const refInput = useRef<HTMLInputElement>(null);
  const { userId } = useTypedSelector((state) => state.user);
  const { refetch: refetchPayments } = useGetPaymentsQuery(_id);
  const { refetch: refetchGroup } = useGetGroupsQuery(userId);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:3001/groups/${_id}`,
        {
          name: name,
          currency: currency,
          users: [
            ...users,
            {
              userName: refInput.current?.value,
              userId: generateRandomString(),
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        refetchPayments();
        refetchGroup();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          ref={refInput}
          type="text"
          id="memberName"
          required
        />
        <label className={styles.memberName} htmlFor="memberName">
          Имя участника
        </label>
      </div>
      <button className={styles.btn} type="submit">
        Готово
      </button>
    </form>
  );
}
