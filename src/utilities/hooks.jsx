import { useState, useEffect } from "react";
import axios from "axios";
const API_HOST = "http://localhost:3000";

export const useFetchLogin = (loginCredentials) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loginCredentials) {
      return;
    }

    let ignore = false;
    setIsLoading(true);

    axios
      .post(`${API_HOST}/login`, loginCredentials)
      .then((res) => {
        if (!ignore) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError(err.response.data.info);
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [loginCredentials]);

  return { data, isLoading, error };
};
