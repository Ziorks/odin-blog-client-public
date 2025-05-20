import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function LoginButton() {
  return (
    <div>
      <Link to="login" className={styles.loginButton}>
        Login
      </Link>
      <Link to="register" className={styles.signupButton}>
        Signup
      </Link>
    </div>
  );
}

function UserButtons({ handleLogout }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className={styles.myAccountButton}
        onClick={() => navigate("/my-account")}
      >
        My Account
      </button>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

function Header({ user, handleLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.title}>mein Blog</Link>
        {user ? <UserButtons handleLogout={handleLogout} /> : <LoginButton />}
      </div>
    </header>
  );
}

export default Header;
