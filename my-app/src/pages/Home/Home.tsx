import { useState } from "react";
import { Link } from "react-router-dom";
import { GroupForm } from "../../components/Forms/GroupForm";
import { Modal } from "../../components/Modal";
import { useGetGroupsQuery } from "../../store/groups/groups.api";

import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import styles from "./Home.module.scss";

export function Home() {
  const { userId } = useTypedSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isError, isLoading, data } = useGetGroupsQuery(userId);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.groupHeading}>Мои группы</h2>
        <ul className={styles.groupList}>
          {data &&
            data.map((item) => {
              return (
                <li key={item._id} className={styles.listItem}>
                  <Link className={styles.link} to={`/group/${item._id}`}>
                    {item.name}, количетсво участников {item.users.length}
                  </Link>
                </li>
              );
            })}
        </ul>
        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Создать новую группу{" "}
        </button>
        {isModalOpen && (
          <Modal
            handleClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            header={"Создать новую группу"}
          >
            <GroupForm />
          </Modal>
        )}
      </div>
    </main>
  );
}
