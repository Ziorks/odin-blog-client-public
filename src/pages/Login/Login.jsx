import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFetchLogin } from "../../utilities/hooks";
// import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginCredentials, setLoginCredentials] = useState(null);

  const { handleLogin } = useOutletContext();
  const { data, isLoading, errors } = useFetchLogin(loginCredentials);

  useEffect(() => {
    if (data) {
      const { user, token } = data;
      handleLogin({ user, token });
    }
  }, [data, handleLogin]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginCredentials({ username, password });
  };

  return (
    <>
      {isLoading && <p>Processing...</p>}
      {errors && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
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
