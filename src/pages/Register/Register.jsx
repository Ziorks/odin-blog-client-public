import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "../../utilities/constants";
// import styles from "./Register.module.css";

function Register() {
  const { isLoggedIn } = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors(null);

    axios
      .post(`${API_HOST}/users`, { username, password, passwordConfirm })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errors) {
            setErrors(err.response.data.errors);
          } else {
            setErrors([{ msg: err.response.data.message }]);
          }
        } else {
          setErrors([{ msg: "Something went wrong. Please try again." }]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoggedIn && <Navigate to={"/my-account"} replace />}
      {success ? (
        <p>Your account has been created. You may login now.</p>
      ) : (
        <>
          {isLoading && <p>Processing...</p>}
          {errors && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          )}

          <form onSubmit={handleRegisterSubmit}>
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
            <div>
              <label htmlFor="passwordConfirm">Confirm Password: </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              Register
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default Register;
