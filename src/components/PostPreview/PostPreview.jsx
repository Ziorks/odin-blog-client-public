import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useVisibity } from "../../utilities/hooks";
import styles from "./PostPreview.module.css";

function PostPreview({ post }) {
  const { domRef, isVisible } = useVisibity();

  return (
    <>
      {post ? (
        <article
          ref={domRef}
          className={`${styles.article} ${isVisible ? styles.isVisible : ""}`}
        >
          <Link className={styles.imageLink} to={`/posts/${post.id}`}>
            <img className={styles.image} src={post.imageLink} alt="" />
          </Link>
          <Link className={styles.titleLink} to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <div className={styles.divider}></div>
          <p className={styles.description}>{post.description}</p>
          <Link className={styles.link} to={`/posts/${post.id}`}>
            Read More
          </Link>
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
                <Link
                  className={styles.commentsLink}
                  to={`/posts/${post.id}/#comments`}
                >
                  {`${post._count.comments} COMMENT${post._count.comments > 1 && "S"}`}
                </Link>
              </li>
            )}
          </ul>
          <div className={styles.divider}></div>
        </article>
      ) : (
        <div
          ref={domRef}
          className={`${styles.loading} ${isVisible ? styles.isVisible : ""}`}
        ></div>
      )}
    </>
  );
}

export default PostPreview;
