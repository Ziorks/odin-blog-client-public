import { Link } from "react-router-dom";
import styles from "./PostPreview.module.css";

const testPost = {
  id: 0,
  title: "Title",
  body: "This is the body.  Hope it be long enought for testing.  This is the body.  Hope it be long enought for testing.  This is the body.  Hope it be long enought for testing.  This is the body. This is the body. This is the body. This is the body. ",
  createdAt: Date.now(),
  isPublished: true,
  authorId: 1,
  author: { username: "Zoinks" },
  comments: [
    {
      id: 0,
      body: "comment numero uno",
      createdAt: Date.now(),
      authorId: 1,
      postId: 0,
    },
    {
      id: 1,
      body: "second comment",
      createdAt: Date.now(),
      authorId: 2,
      postId: 0,
    },
  ],
};

function PostPreview() {
  return (
    <>
      <Link className={styles.link} to={`posts/${testPost.id}`}>
        <article className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src="https://picsum.photos/201/300"
              alt=""
            />
          </div>
          <p className={styles.title}>{testPost.title}</p>
        </article>
      </Link>
      <div className={styles.loading}>Loading Preview</div>
    </>
  );
}

export default PostPreview;
