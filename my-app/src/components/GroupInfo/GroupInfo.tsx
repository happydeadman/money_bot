import React from "react";
import { IGroupDetails } from "../../pages/Payments";
import { IGroups } from "../../store/groups/groups.type";
import { Circle } from "./Circle";
import { GroupDetails } from "./GroupDetails";
import styles from "./GroupInfo.module.scss";
import { GroupNavigation } from "./GroupNavigation";

export interface IGroupInfo {
  groupInfo?: IGroups;
  groupDetails?: IGroupDetails;
}

export function GroupInfo({ groupInfo, groupDetails }: IGroupInfo) {
  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupInfo}>
        <Circle
          currency={groupInfo?.currency}
          userId={groupDetails?.whoPayNext.userName}
          amount={groupDetails?.whoPayNext.amount}
        />
        {groupInfo && groupDetails && (
          <GroupDetails
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
      <GroupNavigation />
    </div>
  );
}
