import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

import styles from "./Post.module.css";
import { useState } from "react";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["Post muito bacana, hein?!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH':'mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleNewCommentChange = (event) => {
    setNewCommentText(event.target.value);
  };

  const handleCreateNewComment = (event) => {
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText("");
  };

  const deleteComment = (comment) => {
    const newCommentText = comments.filter(
      (commentOnList) => commentOnList !== comment
    );
    setComments(newCommentText);
  };

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}

        <p>
          {content.map((line) => {
            if (line.type === "hashTag") {
              return (
                <a key={line.content} href="#">
                  {line.content}
                </a>
              );
            }
          })}
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="commentTextArea"
          placeholder="Escreva seu comentário..."
          onChange={handleNewCommentChange}
          value={newCommentText}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
