import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import axios from "axios";
import { API_HOST } from "../../utilities/constants";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useOutletContext();
  const { user } = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    axios
      .post(`${API_HOST}/login`, { username, password })
      .then((res) => {
        navigate("/", { replace: true, flushSync: true });
        const { id, username } = res.data.user;
        const user = { id, username, token: res.data.token };
        handleLogin(user);
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
    <main>
      {user && <Navigate to={"/my-account"} replace />}
      <form onSubmit={handleLoginSubmit} className={styles.form}>
        {isLoading && <p className={styles.loading}>Processing...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.fieldContainer}>
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
        <div className={styles.fieldContainer}>
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
        <div className={styles.buttonContainer}>
          <button type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
      <p className={styles.registerContainer}>
        No account? No problem.{" "}
        <Link to="/register" className={styles.registerLink}>
          Register here
        </Link>
      </p>
    </main>
  );
}

export default Login;
