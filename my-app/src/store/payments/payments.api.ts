import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TypeRootState } from "../store";
import { IPayment } from "./payments.type";

export const paymentsApi = createApi({
  reducerPath: "api/payments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getPayments: build.query<IPayment[], string | undefined>({
      query: (groupId) => `payments/groupPayments/${groupId}`,
    }),
  }),
});

export const { useGetPaymentsQuery } = paymentsApi;
