import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function LoginButton() {
  return (
    <Link to="login" className={styles.loginButton}>
      Login
    </Link>
  );
}

function UserButtons({ handleLogout }) {
  return (
    <>
      <button>My Account</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

function Header({ user, handleLogout }) {
  return (
    <header className={styles.header}>
      <Link className={styles.title}>Mein Bloggen</Link>
      {user ? <UserButtons handleLogout={handleLogout} /> : <LoginButton />}
    </header>
  );
}

export default Header;
