import React, { useState } from "react";
import { IMembersProps } from "../MembersInfo";
import styles from "./MembersList.module.scss";
import { Modal } from "../../Modal";
import { MemberUpdateForm } from "../../Forms/MemberUpdateForm";

export type TUser = {
  userName: string;
  userId: string;
};

export function MembersList({ group }: IMembersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<TUser>({ userName: "", userId: "" });
  const handleClick = (user: TUser) => {
    setUser(user);
    setIsOpen(!isOpen);
  };

  return (
    <ul className={styles.membersContainer}>
      <h3 className={styles.heading}>Участники</h3>
      {group &&
        group.users.map((user) => (
          <li className={styles.listItem} key={user.userId}>
            <button onClick={() => handleClick(user)} className={styles.btn}>
              <div className={styles.info}>
                <h4 className={styles.memberName}>{user.userName}</h4>
              </div>
              <div className={styles.amount}>399 bucks</div>
            </button>
          </li>
        ))}
      {isOpen && group && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          header={"Редактирование участника"}
        >
          <MemberUpdateForm
            handleClose={() => setIsOpen(false)}
            currency={group.currency}
            _id={group._id}
            users={group.users}
            name={group.name}
            user={user}
          />
        </Modal>
      )}
    </ul>
  );
}
