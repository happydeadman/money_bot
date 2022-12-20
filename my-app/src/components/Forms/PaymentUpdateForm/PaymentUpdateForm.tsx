import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useGetPaymentsQuery } from "../../../store/payments/payments.api";
import { IUserIncome } from "../../../store/payments/payments.type";
import { Input } from "../../Input";
import styles from "./PaymentUpdateForm.module.scss";

interface IPaymentForm {
  name: string;
  groupId: string;
  currency: string;
  amount: number;
  id: string;
  income: IUserIncome[];
  handleClose: () => void | null;
}
/**
 * ! find way to improve useEffect
 */

export function PaymentUpdateForm(props: IPaymentForm) {
  const { groupId, income, currency, name, amount, id, handleClose } = props;
  const { refetch } = useGetPaymentsQuery(groupId);

  const findPayer = (income: IUserIncome[]): IUserIncome => {
    const result = income.find(({ amount }) => amount >= 0);
    if (!result) return { userId: "12", amount: 12, userName: "jopa" };
    return result;
  };

  const [amountValue, setAmountValue] = useState(amount);
  const [updatedIncome, setUpdatedIncome] = useState<IUserIncome[]>(income);
  const [payer, setPayer] = useState<IUserIncome>(findPayer(income));
  const [paymentName, setPaymentName] = useState(name);

  const [checkedState, setCheckedState] = useState<boolean[]>(
    [...Array(updatedIncome.length)].map((el, indexEl) => {
      updatedIncome.forEach((income, indexIncome) => {
        if (indexEl === indexIncome) {
          income.amount === 0 ? (el = false) : (el = true);
        }
      });
      return el;
    })
  );

  useEffect(() => {
    const calcIncome = (income: IUserIncome[]) =>
      income.map((user, index) => ({
        userId: user.userId,
        userName: user.userName,
        amount:
          checkedState[index] === false
            ? 0
            : user.userId === payer.userId
            ? amountValue / checkedState.filter((item) => item).length
            : -amountValue / checkedState.filter((item) => item).length,
      }));

    setUpdatedIncome(calcIncome(updatedIncome));
  }, [checkedState, amountValue, payer]);

  const usersOptions = updatedIncome.map((user) => ({
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
    setCheckedState(updatedCheckedState);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:3001/payments/${id}`,
        {
          name: paymentName,
          totalAmount: amountValue,
          date: new Date(),
          userGroup: groupId,
          income: updatedIncome,
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
        handleClose();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/payments/${id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
        },
      })
      .then((response) => {
        refetch();
        handleClose();
        console.log(response.data);
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
        defaultValue={{ label: payer.userName, value: payer.userId }}
        onChange={(value) => {
          if (value)
            setPayer({ ...payer, userId: value.value, userName: value.label });
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
        {updatedIncome &&
          updatedIncome.map((user, index) => (
            <li key={user.userId} className={styles.listItem}>
              <div className={styles.textBlock}>
                <span className={styles.userName}>{user.userName}</span>
                <span className={styles.splitedAmount}>
                  {user.amount > 0 ? user.amount : Math.abs(user.amount)}
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
          ))}
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
      <button
        className={styles.btnDelete}
        onClick={(e) => {
          onDeleteHandler(e);
        }}
        type="button"
      >
        Удалить
      </button>
      <button className={styles.btnSubmit} type="submit">
        Готово
      </button>
    </form>
  );
}
