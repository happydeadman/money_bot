import { IUserIncome } from "../../store/payments/payments.type";

export const getUniqueListBy = (arr: IUserIncome[]): IUserIncome[] =>
  Object.values(
    arr.reduce((acc, cur) => Object.assign(acc, { [cur.userId]: cur }), {})
  );
