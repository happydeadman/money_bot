import { useState } from "react";
import { IGroups } from "../../store/groups/groups.type";
import { Modal } from "../Modal";
import styles from "./MembersInfo.module.scss";
import { MembersList } from "./MembersList";
import { NewMemberForm } from "../Forms/NewMemberForm";

export interface IMembersProps {
  group: IGroups;
}

export function MembersInfo({ group }: IMembersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MembersList group={group} />
      <button
        className={styles.addButton}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        + Добавить участника
      </button>
      {isOpen && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          header={"Добавить участника"}
        >
          <NewMemberForm
            _id={group._id}
            name={group.name}
            currency={group.currency}
            users={group.users}
            handleClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
