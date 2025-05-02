import { useOutletContext } from "react-router-dom";
// import styles from "./Home.module.css";

function Home() {
  const { user } = useOutletContext();

  return (
    <>{user ? <h1>Welcom back, {user.username}</h1> : <h1>Home Page</h1>}</>
  );
}

export default Home;
