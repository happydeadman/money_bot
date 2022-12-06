import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { groupsApi } from "./groups/groups.api";
import { paymentsApi } from "./payments/payments.api";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(paymentsApi.middleware, groupsApi.middleware),
});
setupListeners(store.dispatch);

export type TypeRootState = ReturnType<typeof store.getState>;
