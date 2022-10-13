import axios from "axios";
import { useEffect, useState } from "react";
import { useTypedSelector } from "./useTypedSelector";

export function useAuth() {
  const { userId, userName } = useTypedSelector((state) => state.user);

  return {
    isAuth: !!userName,
    userName,
    userId,
  };
}
