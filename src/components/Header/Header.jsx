import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function LoginButton() {
  return (
    <Link to="login" className={styles.loginButton}>
      Login
    </Link>
  );
}

function UserButtons({ handleLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/my-account")}>My Account</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className={styles.header}>
      <Link className={styles.title}>Mein Bloggen</Link>
      {isLoggedIn ? (
        <UserButtons handleLogout={handleLogout} />
      ) : (
        <LoginButton />
      )}
    </header>
  );
}

export default Header;
