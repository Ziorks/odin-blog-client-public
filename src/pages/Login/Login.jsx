import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "../../utilities/constants";
// import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleLogin } = useOutletContext();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    axios
      .post(`${API_HOST}/login`, { username, password })
      .then((res) => {
        navigate("/", { replace: true, flushSync: true });
        handleLogin(res.data.token);
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
  };

  return (
    <>
      {isLoggedIn && <Navigate to={"/my-account"} replace />}
      {isLoading && <p>Processing...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
