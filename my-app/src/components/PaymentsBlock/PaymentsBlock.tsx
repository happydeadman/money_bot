import { useState } from "react";
import { IGroups } from "../../store/groups/groups.type";
import { IPayment } from "../../store/payments/payments.type";
import { PaymentForm } from "../Forms/PaymentForm";
import { Modal } from "../Modal";
import { PaymentsList } from "../PaymentsList";
import styles from "./PaymentsBlock.module.scss";

interface IPaymentBlockProps {
  payments: IPayment[];
  groupInfo: IGroups;
}

export function PaymentsBlock({ payments, groupInfo }: IPaymentBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PaymentsList currency={groupInfo.currency} payments={payments} />
      <button
        className={styles.addButton}
        onClick={() => {
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
            handleClose={() => setIsOpen(false)}
            groupId={groupInfo._id}
            currency={groupInfo.currency}
            users={groupInfo.users}
          />
        </Modal>
      )}
    </>
  );
}
