import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { useFetchPostComments, useScrollToAnchor } from "../../utilities/hooks";
import { API_HOST } from "../../utilities/constants";
import styles from "./CommentSection.module.css";

function NewCommentForm({ postId }) {
  const { isLoggedIn } = useOutletContext();
  const [commentBody, setCommentBody] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = { body: commentBody, postId };
    setIsLoading(true);
    setError(null);

    axios
      .post(`${API_HOST}/comments`, payload, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setHasPosted(true);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {hasPosted ? (
        <p>Your comment has been posted!</p>
      ) : isLoading ? (
        <p>Posting your comment...</p>
      ) : isLoggedIn ? (
        <>
          {error && <p>{error}</p>}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className={styles.newComment}
              name="newComment"
              id="newComment"
              placeholder="Join the conversation"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            <button type="submit" className={styles.commentSubmitBtn}>
              Post Comment
            </button>
          </form>
        </>
      ) : (
        <p>You must be logged in to leave a comment</p>
      )}
    </>
  );
}

function Comment({ comment, postAuthorId }) {
  return (
    <li className={styles.commentContainer}>
      <div className={styles.commentInfo}>
        <div>
          <Link
            to={`/users/${comment.author.id}`}
            className={styles.authorLink}
          >
            {comment.author.username}
          </Link>
          {postAuthorId === comment.author.id && (
            <span className={styles.authorTag}>Author</span>
          )}
        </div>
        <time dateTime={comment.createdAt} className={styles.timestamp}>
          {format(comment.createdAt, "do MMMM yyyy kk:mm")}
        </time>
      </div>
      <p className={styles.commentBody}>{comment.body}</p>
    </li>
  );
}

function CommentSection({ postAuthorId, postId }) {
  useScrollToAnchor();
  const { data: comments, error, isLoading } = useFetchPostComments(postId);

  return (
    <div className={styles.commentSection} id="comments">
      <h2>Comments</h2>
      <NewCommentForm postId={postId} />
      {isLoading && <p>Loading...</p>}
      {error && <p>There was an error. Please try again.</p>}
      {comments && (
        <>
          <div className={styles.commentsHead}>
            <p className={styles.commentsCount}>
              {`${comments.length} COMMENT${comments.length > 1 && "S"}`}{" "}
            </p>
          </div>
          <ol className={styles.commentsContainer}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                postAuthorId={postAuthorId}
              />
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default CommentSection;
