import React, { FormEvent, useRef, useState } from "react";
import styles from "./GroupForm.module.scss";
import Select from "react-select";
import axios from "axios";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

export function GroupForm() {
  const [currency, setCurrency] = useState<any>("");
  const refInput = useRef<HTMLInputElement>(null);
  const { userId, userName } = useTypedSelector((state) => state.user);
  const options = [
    { value: "rub", label: "Рубль" },
    { value: "usd", label: "USD" },
    { value: "kzt", label: "Тенге" },
  ];
  const navigate = useNavigate();
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/groups",
        {
          name: refInput.current?.value,
          currency: currency ? currency : "rub",
          users: [
            {
              userId: userId,
              userName: userName,
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
        navigate(`/group/${response.data._id}`);
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
          id="groupName"
          required
        />
        <label className={styles.groupNames} htmlFor="groupName">
          Название группы
        </label>
      </div>

      <Select
        className={styles.select}
        placeholder={"Укажи валюту группы"}
        options={options}
        onChange={(val) => setCurrency(val?.value)}
      />
      <button className={styles.btn} type="submit">
        Создать
      </button>
    </form>
  );
}
