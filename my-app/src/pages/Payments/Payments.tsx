import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPaymentsQuery } from "../../store/payments/payments.api";
import { Circle } from "../../components/Circle";
import { GroupInfo } from "../../components/GroupInfo";
import { Modal } from "../../components/Modal";
import { PaymentForm } from "../../components/Forms/PaymentForm";
import { useGetGroupsQuery } from "../../store/groups/groups.api";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import { IGroups } from "../../store/groups/groups.type";
import { IPayment, IUserIncome } from "../../store/payments/payments.type";
import { sumById } from "../../utils/js/sumById";
import { getUniqueListBy } from "../../utils/js/getUniqueListBy";
import styles from "./Payments.module.scss";

export interface IGroupDetails {
  paymentsAmount: number;
  totalAmount: number;
  whoPayNext: IUserIncome;
}

export function Payments() {
  const { id } = useParams();
  const { userId } = useTypedSelector((state) => state.user);
  const { data: groups } = useGetGroupsQuery(userId);
  const { data: payments, isLoading, isError } = useGetPaymentsQuery(id);

  const [groupInfo, setGroupInfo] = useState<IGroups>();
  const [groupDetails, setGroupDetails] = useState<IGroupDetails>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setGroupInfo(groups?.find((g) => g._id === id));
  }, [groups, id]);

  useMemo(() => {
    if (payments && payments.length !== 0)
      setGroupDetails(calculatePayments(payments));
  }, [payments]);

  return (
    <main className={styles.main}>
      <div className={styles.groupContainer}>
        <div className={styles.groupInfo}>
          <Circle
            userId={groupDetails?.whoPayNext.userName}
            amount={groupDetails?.whoPayNext.amount}
          />
          {groupInfo && groupDetails && (
            <GroupInfo
              name={groupInfo.name}
              whoPayNext={groupDetails.whoPayNext}
              totalAmount={groupDetails.totalAmount}
              paymentsAmount={groupDetails.paymentsAmount}
              currency={groupInfo.currency}
              users={groupInfo.users}
              _id={groupInfo._id}
            />
          )}
        </div>
        <nav>menu</nav>
      </div>
      <div className={styles.transactionContainer}>
        {payments &&
          payments.map((payment) => {
            return (
              <li key={payment._id}>
                {payment.name} - {payment.totalAmount}
              </li>
            );
          })}
      </div>
      {groupInfo && (
        <>
          <button
            onClick={(e) => {
              setIsOpen(!isOpen);
            }}
          >
            + Добавить транзакцию
          </button>
          {isOpen && (
            <Modal
              handleClose={() => setIsOpen(false)}
              isOpen={isOpen}
              header={"Добавить платеж"}
            >
              <PaymentForm
                groupId={groupInfo._id}
                currency={groupInfo.currency}
                users={groupInfo.users}
              />
            </Modal>
          )}
        </>
      )}
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
    amount: sumById(user.userId, allIncome),
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
