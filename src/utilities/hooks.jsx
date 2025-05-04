import { useState, useEffect } from "react";
import axios from "axios";
const API_HOST = "http://localhost:3000";

export const useFetchLogin = (loginCredentials) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

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
        if (err.response) {
          setErrors(err.response.data.errors);
        } else {
          setErrors(["Something went wrong. Please try again."]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [loginCredentials]);

  return { data, isLoading, errors };
};

export const useFetchRegister = (registerCredentials) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (!registerCredentials) {
      return;
    }

    let ignore = false;
    setIsLoading(true);

    axios
      .post(`${API_HOST}/users`, registerCredentials)
      .then((res) => {
        if (!ignore) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data.errors);
        } else {
          setErrors([{ msg: "Something went wrong. Please try again." }]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [registerCredentials]);

  return { data, isLoading, errors };
};
