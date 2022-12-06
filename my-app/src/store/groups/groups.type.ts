export interface IGroups {
  name: string;
  currency: string;
  users: [
    {
      userName: string;
      userId: string;
    }
  ];
  _id: string;
}
