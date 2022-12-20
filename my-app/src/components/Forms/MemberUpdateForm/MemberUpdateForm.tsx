import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import axios from "axios";
import { IMemberForm } from "../NewMemberForm";
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector";
import { useGetPaymentsQuery } from "../../../store/payments/payments.api";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import { TUser } from "../../MembersInfo/MembersList";
import styles from "./MemberUpdateForm.module.scss";

interface IMemberUpdate extends IMemberForm {
  user: TUser;
}

export function MemberUpdateForm({
  currency,
  _id,
  users,
  name,
  handleClose,
  user,
}: IMemberUpdate) {
  const { userId } = useTypedSelector((state) => state.user);
  const { refetch: refetchPayments } = useGetPaymentsQuery(_id);
  const { refetch: refetchGroup } = useGetGroupsQuery(userId);
  const [newName, setNewName] = useState(user.userName);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const renamedUserArray = users.map((el) =>
      el.userId === user.userId ? { ...el, userName: newName } : el
    );

    axios
      .put(
        `http://localhost:3001/groups/${_id}`,
        {
          name: name,
          currency: currency,
          users: renamedUserArray,
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

  const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filteredUsers = users.filter((el) => el.userId !== user.userId);

    axios
      .put(
        `http://localhost:3001/groups/${_id}`,
        {
          name: name,
          currency: currency,
          users: filteredUsers,
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
          onChange={(e) => {
            onChangeHandler(e);
          }}
          value={newName}
          type="text"
          id="memberName"
          required
        />
        <label className={styles.memberName} htmlFor="memberName">
          Имя участника
        </label>
      </div>
      <button className={styles.deleteBtn} onClick={(e) => onDeleteHandler(e)}>
        Удалить участника
      </button>
      <button className={styles.btn} type="submit">
        Готово
      </button>
    </form>
  );
}
