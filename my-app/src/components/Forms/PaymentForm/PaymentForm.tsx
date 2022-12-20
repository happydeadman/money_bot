import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Select from "react-select";
import { useGetPaymentsQuery } from "../../../store/payments/payments.api";
import styles from "./PaymentForm.module.scss";
import { Input } from "../../Input";

interface IPaymentForm {
  groupId: string;
  currency: string;
  handleClose: () => void | null;
  users: [
    {
      userName: string;
      userId: string;
    }
  ];
}

export function PaymentForm(props: IPaymentForm) {
  const { groupId, users, currency, handleClose } = props;
  const { refetch } = useGetPaymentsQuery(groupId);

  const [amountValue, setAmountValue] = useState(0);
  const [payer, setPayer] = useState<String | undefined>("");
  const [paymentName, setPaymentName] = useState("");

  const [checkedState, setCheckedState] = useState(
    new Array(users.length).fill(true)
  );

  const usersOptions = users.map((user) => ({
    value: user.userId,
    label: user.userName,
  }));

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountValue(e.target.valueAsNumber);
  };

  const onChangeCheckboxHandler = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const income = users.map((user, index) => ({
      userId: user.userId,
      userName: user.userName,
      amount:
        checkedState[index] === false
          ? 0
          : user.userId === payer
          ? amountValue / checkedState.filter((item) => item).length
          : -amountValue / checkedState.filter((item) => item).length,
    }));

    axios
      .post(
        "http://localhost:3001/payments",
        {
          name: paymentName,
          totalAmount: amountValue,
          date: new Date(),
          userGroup: groupId,
          income: income,
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
        refetch();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className={styles.form}>
      <label className={styles.label} htmlFor="userSelect">
        Кто заплатил
      </label>
      <Select
        options={usersOptions}
        placeholder={"Выбери плательщика"}
        className={styles.select}
        onChange={(value) => {
          setPayer(value?.value);
        }}
      />
      <span className={styles.inputNumberContainer}>
        <input
          onChange={(e) => onChangeHandler(e)}
          className={styles.numberInput}
          type="number"
          name="totalAmount"
          value={amountValue ? amountValue : 0}
        />
        <span>{currency}</span>
      </span>
      <label className={styles.label}>За кого</label>
      <ul>
        {users &&
          users.map((user, index) => {
            return (
              <li key={user.userId} className={styles.listItem}>
                <div className={styles.textBlock}>
                  <span className={styles.userName}>{user.userName}</span>
                  <span className={styles.splitedAmount}>
                    {checkedState[index] === false
                      ? 0
                      : amountValue /
                        checkedState.filter((item) => item).length}{" "}
                    {currency}
                  </span>
                </div>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={checkedState[index]}
                  onChange={() => onChangeCheckboxHandler(index)}
                  id={user.userId}
                />
              </li>
            );
          })}
      </ul>
      <label className={styles.label} htmlFor="name">
        Назначение платежа
      </label>
      <Input
        value={paymentName}
        type="text"
        name="name"
        placeholder="Например Пиво и чипсы"
        onChange={(e) => {
          setPaymentName(e.target.value);
        }}
      />

      <button type="submit">Готово</button>
    </form>
  );
}
