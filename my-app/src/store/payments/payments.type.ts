export interface IPayment {
  _id: string;
  name: string;
  totalAmount: number;
  income: IUserIncome[];
}

export interface IUserIncome {
  userName: string;
  userId: string;
  amount: number;
}
