import { FormEvent, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import styles from "./GroupForm.module.scss";

export function GroupForm() {
  const { userId, userName } = useTypedSelector((state) => state.user);
  const { refetch } = useGetGroupsQuery(userId);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState<any>("");
  const navigate = useNavigate();
  const refInput = useRef<HTMLInputElement>(null);

  const options = [
    { value: "rub", label: "Рубль" },
    { value: "usd", label: "USD" },
    { value: "kzt", label: "Тенге" },
  ];
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (refInput.current && refInput.current.value.length < 3) {
      setError("Название группы не может быть меньше 3-х символов");
      return;
    }
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
        refetch();
        navigate(`/group/${response.data._id}/join`);
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
        />
        <label className={styles.groupNames} htmlFor="groupName">
          Название группы
        </label>
        {error && <span className={styles.error}> {error}</span>}
      </div>

      <Select
        className={styles.select}
        placeholder={"Укажи валюту группы"}
        options={options}
        onChange={(val) => setCurrency(val?.value)}
        defaultValue={options[0]}
      />
      <button className={styles.btn} type="submit">
        Создать
      </button>
    </form>
  );
}
