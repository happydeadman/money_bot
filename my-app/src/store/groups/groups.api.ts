import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TypeRootState } from "../store";
import { IGroups } from "./groups.type";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers) => {
      // const token = (getState() as TypeRootState).user.token;
      const token = cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getGroups: build.query<IGroups[], string | null>({
      query: (id) => `groups/userGroups/${id}`,
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApi;
