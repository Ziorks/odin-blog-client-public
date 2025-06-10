import { useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "../../utilities/constants";
import styles from "./MyAccount.module.css";

function DeleteAccountSection() {
  const { user } = useOutletContext();
  const { handleLogout } = useOutletContext();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [doubleConfirmDelete, setDoubleConfirmDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleDelete() {
    setError(null);
    setIsLoading(true);
    setConfirmDelete(false);
    setDoubleConfirmDelete(false);

    axios
      .delete(`${API_HOST}/users/${user.id}`, {
        headers: { Authorization: user.token },
      })
      .then(() => {
        handleLogout();
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
  }

  return (
    <div>
      {isLoading && <p>Deleting...</p>}
      {error && <p>{error}</p>}
      {doubleConfirmDelete ? (
        <div className={styles.confirmMessage}>
          <p>SERIOUSLY. THIS IS PERMANENT. ARE YOU ABSOLUTELY SURE?</p>
          <div>
            <button
              className={styles.cancelButton}
              onClick={() => {
                setConfirmDelete(false);
                setDoubleConfirmDelete(false);
              }}
            >
              Cancel
            </button>
            <button className={styles.confirmButton} onClick={handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      ) : confirmDelete ? (
        <div className={styles.confirmMessage}>
          <p>Are you sure you want to delete your account forever?</p>
          <div>
            <button
              className={styles.cancelButton}
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
            <button
              className={styles.confirmButton}
              onClick={() => setDoubleConfirmDelete(true)}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.deleteButton}
          onClick={() => {
            setConfirmDelete(true);
            setError(null);
          }}
          disabled={isLoading}
        >
          DELETE ACCOUNT
        </button>
      )}
    </div>
  );
}

function UpdateUserForm() {
  const { user, handleLogin } = useOutletContext();
  const [username, setUsername] = useState(user.username);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  function handleUpdateSubmit(e) {
    e.preventDefault();
    setErrors(null);
    setIsLoading(true);
    setHasUpdated(false);
    const payload = {
      username,
      oldPassword,
      password,
      passwordConfirm,
    };

    axios
      .put(`${API_HOST}/users/${user.id}`, payload, {
        headers: { Authorization: user.token },
      })
      .then((res) => {
        setHasUpdated(true);
        const { token, id } = user;
        const { username } = res.data.user;
        const updatedUser = { username, id, token };
        setOldPassword("");
        setPassword("");
        setPasswordConfirm("");
        handleLogin(updatedUser);
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
  }

  return (
    <form onSubmit={handleUpdateSubmit} className={styles.form}>
      <h2 className={styles.formHeading}>Update your account info</h2>
      <div>
        <h3 className={styles.formHeading}>Username</h3>
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
      </div>
      <div>
        <h3 className={styles.formHeading}>Password &#40;optional&#41;</h3>
        <div className={styles.fieldContainer}>
          <label htmlFor="oldPassword">Old Password: </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="password">New Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="passwordConfirm">Confirm New Password: </label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {isLoading && <p className={styles.loading}>Saving...</p>}
        {errors && (
          <ul>
            {errors.map((error, index) => (
              <li key={index} className={styles.error}>
                {error.msg}
              </li>
            ))}
          </ul>
        )}
        {hasUpdated && <p>Your changes have been saved!</p>}
        <button type="submit" disabled={isLoading}>
          Save
        </button>
      </div>
    </form>
  );
}

function MyAccount() {
  const { user } = useOutletContext();

  return (
    <main>
      {user ? (
        <>
          <h1 className={styles.heading}>{user.username}'s Account</h1>
          <Link className={styles.publicProfileLink} to={`/users/${user.id}`}>
            View Public Profile
          </Link>
          <UpdateUserForm />
          <DeleteAccountSection />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </main>
  );
}

export default MyAccount;
