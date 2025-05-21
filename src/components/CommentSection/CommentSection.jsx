import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { useFetchPostComments, useScrollToAnchor } from "../../utilities/hooks";
import { API_HOST } from "../../utilities/constants";
import styles from "./CommentSection.module.css";

function NewCommentForm({ postId }) {
  const { user } = useOutletContext();
  const [commentBody, setCommentBody] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const payload = { body: commentBody, postId };
    setIsLoading(true);
    setError(null);

    axios
      .post(`${API_HOST}/comments`, payload, {
        headers: {
          Authorization: user.token,
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
      ) : user ? (
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
  const { user } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleEditClick() {
    setIsEditing(true);
    setEditBody(comment.body);
  }

  function handleEditCancel() {
    setIsEditing(false);
    setError(null);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const payload = { body: editBody };

    axios
      .put(`${API_HOST}/comments/${comment.id}`, payload, {
        headers: { Authorization: user.token },
      })
      .then(() => {
        setIsEditing(false);
        setIsEdited(true);
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
  }

  function handleDeleteClick() {
    setShowDeleteConfirm(true);
  }

  function handleDeleteConfirm() {
    setIsLoading(true);
    setError(null);

    axios
      .delete(`${API_HOST}/comments/${comment.id}`, {
        headers: { Authorization: user.token },
      })
      .then(() => {
        setShowDeleteConfirm(false);
        setIsDeleted(true);
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
  }

  function handleDeleteCancel() {
    setShowDeleteConfirm(false);
    setError(null);
  }

  return (
    <li className={styles.commentContainer}>
      <div className={styles.commentInfo}>
        {isDeleted ? (
          <p>Deleted</p>
        ) : (
          <>
            <div>
              {comment.author ? (
                <>
                  <Link
                    to={`/users/${comment.author.id}`}
                    className={styles.authorLink}
                  >
                    {comment.author.username}
                  </Link>
                  {postAuthorId === comment.author.id && (
                    <span className={styles.authorTag}>Author</span>
                  )}
                </>
              ) : (
                <p>&#91;deleted&#93;</p>
              )}
            </div>
            <div>
              <p className={styles.timestamp}>
                Posted:{" "}
                <time dateTime={comment.createdAt}>
                  {format(comment.createdAt, "do MMMM yyyy kk:mm")}
                </time>
              </p>
              {comment.createdAt !== comment.editedAt && (
                <p className={styles.timestamp}>
                  Last Edited:{" "}
                  <time dateTime={comment.editedAt}>
                    {format(comment.editedAt, "do MMMM yyyy kk:mm")}
                  </time>
                </p>
              )}
            </div>
          </>
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <textarea
            className={styles.editedComment}
            name="editedComment"
            id="editedComment"
            value={editBody}
            onChange={(e) => {
              setEditBody(e.target.value);
            }}
          />
          <div className={styles.editActions}>
            <p>
              {isLoading && "Saving..."}
              {error}
            </p>
            <button disabled={isLoading} onClick={handleEditCancel}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading}>
              Save
            </button>
          </div>
        </form>
      ) : (
        <p className={styles.commentBody}>
          {isEdited
            ? "Comment edited successfully"
            : isDeleted
              ? "Comment deleted successfully"
              : comment.body}
        </p>
      )}
      {user && user.id === comment.author?.id && (
        <div className={styles.actionsContainer}>
          {showDeleteConfirm ? (
            <>
              {isLoading && <p>Deleting...</p>}
              {error && <p>{error}</p>}
              <p className={styles.deleteConfirm}>
                Are you sure you want to delete this comment?
                <button disabled={isLoading} onClick={handleDeleteCancel}>
                  No
                </button>
                <button disabled={isLoading} onClick={handleDeleteConfirm}>
                  Yes
                </button>
              </p>
            </>
          ) : (
            !isDeleted &&
            !isEditing &&
            !isEdited && (
              <>
                <button className={styles.editButton} onClick={handleEditClick}>
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </>
            )
          )}
        </div>
      )}
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
              {`${comments.length} COMMENT${comments.length === 1 ? "" : "S"}`}
            </p>
          </div>
          {comments.length > 0 ? (
            <ol className={styles.commentsContainer}>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  postAuthorId={postAuthorId}
                />
              ))}
            </ol>
          ) : (
            <p>There are no comments</p>
          )}
        </>
      )}
    </div>
  );
}

export default CommentSection;
