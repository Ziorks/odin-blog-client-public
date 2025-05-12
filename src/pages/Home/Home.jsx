import PostPreview from "../../components/PostPreview";
import styles from "./Home.module.css";
import { useFetchAllPosts } from "../../utilities/hooks";

function Home() {
  const { data, error, isLoading } = useFetchAllPosts();

  return (
    <>
      <h1 className={styles.header}>Blog</h1>
      <div className={styles.previewContainer}>
        {isLoading &&
          new Array(32).fill().map((_, i) => <PostPreview key={i} />)}
        {error && <p>An error occured. Try refreshing the page.</p>}
        {data &&
          data.posts.map((post) => <PostPreview key={post.id} post={post} />)}
      </div>
    </>
  );
}

export default Home;
