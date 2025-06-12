import PostPreview from "../../components/PostPreview";
import styles from "./Home.module.css";
import { useFetchAllPosts } from "../../utilities/hooks";

function Home() {
  const { data, error, isLoading } = useFetchAllPosts();

  return (
    <main>
      <h1 className={styles.header}>Blog</h1>
      <div className={styles.previewContainer}>
        {isLoading &&
          new Array(8).fill().map((_, i) => <PostPreview key={i} />)}
        {error && <p>An error occured. Try refreshing the page.</p>}
        {data &&
          (data.posts.length > 0 ? (
            data.posts.map((post) => <PostPreview key={post.id} post={post} />)
          ) : (
            <p>There doesn't seem to be any posts yet...</p>
          ))}
      </div>
    </main>
  );
}

export default Home;
