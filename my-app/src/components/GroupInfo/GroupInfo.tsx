import React from "react";
import { IGroupDetails } from "../../pages/Payments";
import { IGroups } from "../../store/groups/groups.type";
import styles from "./GroupInfo.module.scss";

interface IGroupInfo extends IGroups, IGroupDetails {}

export function GroupInfo({
  name,
  users,
  currency,
  _id,
  whoPayNext,
  paymentsAmount,
  totalAmount,
}: IGroupInfo) {
  return (
    <div>
      <h3>{name}</h3>
      <ul>
        <li>
          Транзакции: <span>{paymentsAmount}</span>
        </li>
        <li>
          Участники: <span>{users.length}</span>
        </li>
        <li>
          Итого заплачено:{" "}
          <span>
            {currency} {totalAmount}
          </span>
        </li>
      </ul>
      <div>
        Следующим платит <span>{whoPayNext.userName}</span>
      </div>
    </div>
  );
}
