import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPaymentsQuery } from "../../store/payments/payments.api";
import { GroupInfo } from "../../components/GroupInfo";
import { useGetGroupsQuery } from "../../store/groups/groups.api";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import { IGroups } from "../../store/groups/groups.type";
import { IPayment, IUserIncome } from "../../store/payments/payments.type";
import { sumById } from "../../utils/js/sumById";
import { getUniqueListBy } from "../../utils/js/getUniqueListBy";
import { PaymentsBlock } from "../../components/PaymentsBlock";
import { MembersInfo } from "../../components/MembersInfo";
import styles from "./Payments.module.scss";
import { Loader } from "../../components/Loader";
import { useToast } from "@chakra-ui/react";
import { useLogout } from "../../utils/hooks/useLogout";

export interface IGroupDetails {
  paymentsAmount: number;
  totalAmount: number;
  whoPayNext: IUserIncome;
}

export function Payments() {
  const { id, action } = useParams();
  const { userId, userName } = useTypedSelector((state) => state.user);
  const skip = userId === undefined ? true : false;
  const toast = useToast();
  const logout = useLogout();
  const {
    data: groups,
    isLoading: groupLoading,
    error: groupError,
  } = useGetGroupsQuery(userId, {
    skip,
  });
  const {
    data: payments,
    isLoading,
    isError,
    error: paymentError,
  } = useGetPaymentsQuery(id);

  const [groupInfo, setGroupInfo] = useState<IGroups>();
  const [groupDetails, setGroupDetails] = useState<IGroupDetails>({
    paymentsAmount: 0,
    totalAmount: 0,
    whoPayNext: {
      amount: 0,
      userId: userId,
      userName: userName,
    },
  });
  const [page, setPage] = useState<JSX.Element>();

  useEffect(() => {
    if (groupError && "data" in groupError && groupError.status === 401) {
      toast({
        title: "Авторизационная сессия истекла",
        description: "Пожалуйста, войдите в сервис снова",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      logout();
    }
    if (paymentError && "data" in paymentError && paymentError.status === 401) {
      toast({
        title: "Авторизационная сессия истекла",
        description: "Пожалуйста, войдите в сервис снова",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      logout();
    }
    if (groupError && "data" in groupError && groupError.status !== 401) {
      toast({
        title: "Что-то пошло не так",
        description: "Пожалуйста, попробуйте позже и обновите страницу",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [groupError, isError, toast, paymentError, logout]);

  useEffect(() => {
    if (!payments || !groupInfo) return;
    const determineAction = (action: string = "join") => {
      switch (action) {
        case "join":
          return <PaymentsBlock payments={payments} groupInfo={groupInfo} />;
        case "members":
          return <MembersInfo group={groupInfo} />;
      }
    };

    setPage(determineAction(action));
  }, [action, payments, groupInfo]);

  useEffect(() => {
    setGroupInfo(groups?.find((g) => g._id === id));
  }, [groups, id]);

  useMemo(() => {
    if (payments && payments.length !== 0)
      setGroupDetails(calculatePayments(payments));
  }, [payments]);

  return (
    <main className={styles.main}>
      {groupLoading && <Loader />}
      {isLoading && <Loader />}
      <GroupInfo groupDetails={groupDetails} groupInfo={groupInfo} />
      {page}
    </main>
  );
}

const calculatePayments = (payments: IPayment[]) => {
  const totalAmount = payments.reduce(
    (acc, element) => acc + element.totalAmount,
    0
  );
  const allIncome: IUserIncome[] = [];
  payments.forEach((payment) => {
    payment.income.forEach((e) => {
      allIncome.push(e);
    });
  });

  const uniqueUserList: IUserIncome[] = getUniqueListBy(allIncome);

  const incomeByUser = uniqueUserList.map((user) => ({
    userName: user.userName,
    userId: user.userId,
    amount: sumById(user.userId ? user.userId : "", allIncome),
  }));

  const smallestIncome = incomeByUser.reduce((prev, curr) =>
    prev.amount < curr.amount ? prev : curr
  );
  return {
    paymentsAmount: payments.length ? payments.length : 0,
    totalAmount: totalAmount,
    whoPayNext: smallestIncome,
  };
};
