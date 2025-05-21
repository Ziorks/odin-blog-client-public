import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import styles from "./User.module.css";
import {
  useFetchUser,
  useFetchUserComments,
  useFetchUserPosts,
} from "../../utilities/hooks";

function UserPosts({ userId }) {
  const { data: posts, error, isLoading } = useFetchUserPosts(userId);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts && posts.length > 0 ? (
        <ol className={styles.postsList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.post}>
              <Link to={`/posts/${post.id}`} className={styles.postLink}>
                <h2>{post.title}</h2>
                <p className={styles.time}>
                  {formatDistanceToNowStrict(post.createdAt, {
                    addSuffix: true,
                  })}
                </p>
                <p>{post.description}</p>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p>This user has no posts</p>
      )}
    </>
  );
}

function UserComments({ userId }) {
  const { data: comments, error, isLoading } = useFetchUserComments(userId);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {comments && comments.length > 0 ? (
        <ol className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <Link
                to={`/posts/${comment.post.id}#comments`}
                className={styles.postLink}
              >
                <p className={styles.commentPost}>
                  {comment.post.title}
                  <span className={styles.time}>
                    {formatDistanceToNowStrict(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </span>
                  {comment.editedAt !== comment.createdAt && (
                    <span className={styles.time}>
                      Last edited:{" "}
                      {formatDistanceToNowStrict(comment.editedAt, {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </p>
                <p>{comment.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p>This user has no comments</p>
      )}
    </>
  );
}

const SELECTIONS = {
  POSTS: 1,
  COMMENTS: 2,
};

function User() {
  const { userId } = useParams();
  const { data: user, error, isLoading } = useFetchUser(userId);
  const [selection, setSelection] = useState(SELECTIONS.POSTS);

  function handlePostsSelect() {
    if (selection !== SELECTIONS.POSTS) {
      setSelection(SELECTIONS.POSTS);
    }
  }

  function handleCommentsSelect() {
    if (selection !== SELECTIONS.COMMENTS) {
      setSelection(SELECTIONS.COMMENTS);
    }
  }

  return (
    <main>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && (
        <div className={styles.mainContainer}>
          <h1>{user.username}</h1>
          <div className={styles.buttonContainer}>
            <button
              onClick={handlePostsSelect}
              className={`${styles.selectionButton} ${selection === SELECTIONS.POSTS ? styles.selected : ""}`}
            >
              Posts
            </button>
            <button
              onClick={handleCommentsSelect}
              className={`${styles.selectionButton} ${selection === SELECTIONS.COMMENTS ? styles.selected : ""}`}
            >
              Comments
            </button>
          </div>
          {selection === SELECTIONS.POSTS && <UserPosts userId={userId} />}
          {selection === SELECTIONS.COMMENTS && (
            <UserComments userId={userId} />
          )}
        </div>
      )}
    </main>
  );
}

export default User;
