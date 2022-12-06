import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export const useAxios = <T>(
  config: AxiosRequestConfig<any>,
  loadOnStart: boolean = true
): [boolean, T | undefined, string, () => void] => {
  const [loading, setLoading] = useState(true);
  const [dataA, setData] = useState<T>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setLoading(true);

    axios(config)
      .then((response) => {
        setError("");
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return [loading, dataA, error, request];
};
