import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TypeRootState } from "../store";
import { IGroups } from "./groups.type";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
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
    getGroups: build.query<IGroups[], string>({
      query: (id) => `groups/userGroups/${id}`,
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApi;
