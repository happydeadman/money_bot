import { IUserIncome } from "../../store/payments/payments.type";

export const sumById = (id: string, array: IUserIncome[]): number =>
  array.filter((i) => i.userId === id).reduce((a, b) => a + b.amount, 0);
