import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GroupForm } from "../../components/Forms/GroupForm";
import { Modal } from "../../components/Modal";
import { useGetGroupsQuery } from "../../store/groups/groups.api";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import styles from "./Home.module.scss";
import { Loader } from "../../components/Loader";
import { useToast } from "@chakra-ui/react";
import { useLogout } from "../../utils/hooks/useLogout";

export function Home() {
  const toast = useToast();
  const { userId } = useTypedSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skip = userId === undefined ? true : false;
  const { isError, isLoading, data, error } = useGetGroupsQuery(userId, {
    skip,
  });
  const logout = useLogout();

  useEffect(() => {
    if (error && "data" in error && error.status === 401) {
      toast({
        title: "Авторизационная сессия истекла",
        description: "Пожалуйста, войдите в сервис снова",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      logout();
    }
    if (error && "data" in error && error.status !== 401) {
      toast({
        title: "Что-то пошло не так",
        description: "Пожалуйста, попробуйте позже и обновите страницу",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, isError, toast, logout]);

  return (
    <main className={styles.main}>
      {isLoading && <Loader />}
      <div className={styles.container}>
        <h2 className={styles.groupHeading}>Мои группы</h2>
        <ul className={styles.groupList}>
          {data &&
            data.map((item) => {
              return (
                <li key={item._id} className={styles.listItem}>
                  <Link className={styles.link} to={`/group/${item._id}/join`}>
                    {item.name}, количетсво участников {item.users.length}
                  </Link>
                </li>
              );
            })}
        </ul>
        <button
          className={styles.button}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Создать новую группу
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
