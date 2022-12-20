import { IGroupDetails } from "../../../pages/Payments";
import { IGroups } from "../../../store/groups/groups.type";
import styles from "./GroupDetails.module.scss";

interface IGroupDetailsExpand
  extends Partial<IGroups>,
    Partial<IGroupDetails> {}

export function GroupDetails({
  name,
  users,
  currency,
  _id,
  whoPayNext,
  paymentsAmount,
  totalAmount,
}: IGroupDetailsExpand) {
  return (
    <div className={styles.groupInfoContainer}>
      <h3 className={styles.groupName}>{name}</h3>
      <ul>
        <li className={styles.groupItem}>
          Транзакции:{" "}
          <span className={styles.accent}>
            {paymentsAmount ? paymentsAmount : 0}
          </span>
        </li>
        <li className={styles.groupItem}>
          Участники:{" "}
          <span className={styles.accent}>{users ? users.length : 0}</span>
        </li>
        <li className={styles.groupItem}>
          Итого заплачено:{" "}
          <span className={styles.accent}>
            {currency} {totalAmount ? totalAmount : 0}
          </span>
        </li>
      </ul>
      <div>
        Следующим платит:{" "}
        <span className={styles.accent}>
          {whoPayNext ? whoPayNext.userName : "Может платить любой"}
        </span>
      </div>
    </div>
  );
}
