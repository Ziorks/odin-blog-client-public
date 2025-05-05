import { useOutletContext } from "react-router-dom";
import PostPreview from "../../components/PostPreview";
// import styles from "./Home.module.css";

function Home() {
  const { user } = useOutletContext();

  return (
    <>
      {user ? <h1>Welcom back, {user.username}</h1> : <h1>Home Page</h1>}
      <PostPreview />
    </>
  );
}

export default Home;
