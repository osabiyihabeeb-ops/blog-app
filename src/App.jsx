import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Osabiyi Habeeb", username: "@osabiyi", text: "Just finished my first React app! Student Registration App is live on GitHub 🚀", likes: 12, liked: false, time: "2h" },
      { id: 2, name: "Arike Habeeb", username: "@arike", text: "Learning Backend is hard but we move! Who else is learning Node.js?", likes: 5, liked: false, time: "4h" },
    ];
  });

  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: Date.now(),
      name: "Osabiyi Habeeb",
      username: "@osabiyi",
      text: newPost,
      likes: 0,
      liked: false,
      time: "now",
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id) => {
    setPosts(posts.map((p) => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1>🐦 Mini Twitter</h1>
        <p>Home</p>
        <p>Explore</p>
        <p>Notifications</p>
        <p>Profile</p>
      </div>

      <div className="feed">
        <h2 className="feed-title">Home</h2>

        {/* CREATE POST */}
        <div className="composer">
          <div className="avatar">O</div>
          <div className="composer-input">
            <textarea
              placeholder="What's happening?!"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              maxLength={280}
            />
            <div className="composer-footer">
              <span className={280 - newPost.length < 20 ? "red" : ""}>
                {280 - newPost.length} left
              </span>
              <button onClick={handlePost} disabled={newPost.trim() === ""}>
                Post
              </button>
            </div>
          </div>
        </div>

        {/* DISPLAY ALL POSTS */}
        {posts.length === 0 ? (
          <p className="empty">No posts yet. Be the first to post! 👆</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="avatar">{post.name[0]}</div>
              <div className="post-body">
                <div className="post-header">
                  <b>{post.name}</b>
                  <span> {post.username} • {post.time}</span>
                  {post.username === "@osabiyi" && (
                    <button className="delete-btn" onClick={() => handleDelete(post.id)}>🗑️</button>
                  )}
                </div>
                <p>{post.text}</p>
                <button
                  className={post.liked ? "like-btn liked" : "like-btn"}
                  onClick={() => handleLike(post.id)}
                >
                  {post.liked ? "❤️" : "🤍"} {post.likes}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;