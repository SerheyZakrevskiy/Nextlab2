// app/comments/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";

type Comment = {
  id: number;
  comment: string;
};

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  // завантажуємо коментарі при відкритті сторінки
  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data);
    } catch (e) {
      console.error("Failed to load comments", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  // відправка нового коментаря (POST)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!res.ok) {
        console.error("Failed to create comment");
        return;
      }

      setNewComment("");
      await loadComments(); // перезавантажуємо список
    } catch (e) {
      console.error("Error while creating comment", e);
    }
  };

  // видалення коментаря (DELETE)
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to delete comment");
        return;
      }

      await loadComments();
    } catch (e) {
      console.error("Error while deleting comment", e);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Comments (Frontend + API)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add comment
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && comments.length === 0 && <p>No comments yet</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {comments.map((c) => (
          <li
            key={c.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <span>
              <b>#{c.id}</b>: {c.comment}
            </span>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
