import { useState } from "react";
import { IPayment, IUserIncome } from "../../store/payments/payments.type";
import { PaymentUpdateForm } from "../Forms/PaymentUpdateForm";
import { Modal } from "../Modal";
import styles from "./PaymentsList.module.scss";

interface IPaymentListProps {
  payments: IPayment[];
  currency: string;
}
export function PaymentsList({ payments, currency }: IPaymentListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentNew, setPaymentNew] = useState<IPayment>();
  const whoPayed = (income: IUserIncome[]) => {
    const payer = income.reduce((prev, curr) =>
      prev.amount > curr.amount ? prev : curr
    );
    return payer;
  };
  const moddedPayments = payments.map((payment) => ({
    ...payment,
    whoPayed: whoPayed(payment.income),
  }));

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const handleShow = (payment: IPayment) => {
    setPaymentNew(payment);
    setIsOpen(!isOpen);
  };

  return (
    <ul className={styles.paymentsContainer}>
      <h3 className={styles.heading}>Транзакции</h3>
      {moddedPayments &&
        moddedPayments.map((payment) => (
          <li className={styles.listItem} key={payment._id}>
            <button onClick={() => handleShow(payment)} className={styles.btn}>
              <div className={styles.info}>
                <h4 className={styles.paymentName}>{payment.name}</h4>
                <span className={styles.paymentDate}>
                  {new Date(payment.date).toLocaleString("ru", dateOptions)}
                </span>
                <span className={styles.paymentPayer}>
                  <strong>{payment.whoPayed.userName}</strong> заплатил
                </span>
              </div>
              <div className={styles.amount}>
                {`${currency} ${payment.totalAmount}`}
              </div>
            </button>
          </li>
        ))}
      {isOpen && paymentNew && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          header={"Подробности платежа"}
        >
          <PaymentUpdateForm
            handleClose={() => setIsOpen(false)}
            id={paymentNew._id}
            name={paymentNew.name}
            amount={paymentNew.totalAmount}
            groupId={paymentNew.userGroup}
            currency={currency}
            income={paymentNew.income}
          />
        </Modal>
      )}
    </ul>
  );
}
