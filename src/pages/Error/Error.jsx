import { Link } from "react-router-dom";
import styles from "./Error.module.css";

function Error() {
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.header}>
        404 <br />
        Page Not Found
      </h1>
      <div className={styles.linkContainer}>
        <Link to={-1}>Go Back</Link>
        <Link to="/">Home</Link>
      </div>
    </main>
  );
}

export default Error;
