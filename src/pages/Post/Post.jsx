import styles from "./Post.module.css";
import { Link, useParams } from "react-router-dom";
import { useFetchPost } from "../../utilities/hooks";
import { format } from "date-fns";
import CommentSection from "../../components/CommentSection/CommentSection";

function Post() {
  const { postId } = useParams();
  const { data: post, error, isLoading } = useFetchPost(postId);

  return (
    <main>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {post && (
        <>
          <div className={styles.hero}>
            <figure className={styles.imageContainer}>
              <img className={styles.image} src={post.imageLink} alt="" />
            </figure>
            <header className={styles.header}>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.description}>{post.description}</p>
              <ul className={styles.info}>
                <li>
                  <Link
                    to={`/users/${post.author.id}`}
                    className={styles.authorLink}
                  >
                    {post.author.username.toUpperCase()}
                  </Link>
                </li>
                <li>
                  <time dateTime={post.createdAt}>
                    {format(post.createdAt, "do MMMM yyyy").toUpperCase()}
                  </time>
                </li>
                {post._count.comments > 0 && (
                  <li>
                    <Link className={styles.commentsLink} to="#comments">
                      {`${post._count.comments} COMMENT${post._count.comments > 1 && "S"}`}
                    </Link>
                  </li>
                )}
              </ul>
              {post.editedAt !== post.createdAt && (
                <p className={styles.updatedAt}>
                  Last Updated:{" "}
                  <time dateTime={post.editedAt}>
                    {format(post.createdAt, "do MMMM yyyy")}
                  </time>
                </p>
              )}
            </header>
          </div>
          <article className={styles.article}>{post.body}</article>
          <CommentSection postAuthorId={post.author.id} postId={post.id} />
        </>
      )}
    </main>
  );
}

export default Post;
