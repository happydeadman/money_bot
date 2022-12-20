export interface IPayment {
  _id: string;
  name: string;
  totalAmount: number;
  income: IUserIncome[];
  date: Date;
  userGroup: string;
}

export interface IUserIncome {
  userName: string;
  userId: string;
  amount: number;
}
