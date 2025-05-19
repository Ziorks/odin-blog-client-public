import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "./constants";

export const useScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    let anchor = null;
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
      anchor = document.getElementById(lastHash.current);
    }

    if (lastHash.current && anchor) {
      setTimeout(() => {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 400);
    }
  }, [location]);
};

export const useVisibity = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const domElement = domRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domElement);
        }
      });
    });
    observer.observe(domElement);
    return () => observer.unobserve(domElement);
  }, []);

  return { domRef, isVisible };
};

export const useFetchAllPosts = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    axios
      .get(`${API_HOST}/posts`)
      .then((res) => {
        if (!ignore) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
  }, []);

  return { data, isLoading, error };
};

export const useFetchPost = (postId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    axios
      .get(`${API_HOST}/posts/${postId}`)
      .then((res) => {
        if (!ignore) {
          setData(res.data.post);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
  }, [postId]);

  return { data, isLoading, error };
};

export const useFetchPostComments = (postId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    axios
      .get(`${API_HOST}/posts/${postId}/comments`)
      .then((res) => {
        if (!ignore) {
          setData(res.data.comments);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
  }, [postId]);

  return { data, isLoading, error };
};

export const useFetchUser = (userId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    axios
      .get(`${API_HOST}/users/${userId}`)
      .then((res) => {
        if (!ignore) {
          setData(res.data.user);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
  }, [userId]);

  return { data, isLoading, error };
};

export const useFetchUserPosts = (userId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    axios
      .get(`${API_HOST}/users/${userId}/posts`)
      .then((res) => {
        if (!ignore) {
          setData(res.data.posts);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
  }, [userId]);

  return { data, isLoading, error };
};

export const useFetchUserComments = (userId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    axios
      .get(`${API_HOST}/users/${userId}/comments`)
      .then((res) => {
        if (!ignore) {
          setData(res.data.comments);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
  }, [userId]);

  return { data, isLoading, error };
};
