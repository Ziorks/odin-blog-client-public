import { useEffect, useState } from "react";
import { useFetchRegister } from "../../utilities/hooks";
// import styles from "./Register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registerCredentials, setRegisterCredentials] = useState(null);
  const [success, setSuccess] = useState(false);

  const { data, isLoading, errors } = useFetchRegister(registerCredentials);

  useEffect(() => {
    if (data) {
      setSuccess(true);
    }
  }, [data]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterCredentials({ username, password, passwordConfirm });
  };

  return (
    <>
      {isLoading && <p>Processing...</p>}
      {success ? (
        <p>Your account has been created. You may login now.</p>
      ) : (
        <>
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
