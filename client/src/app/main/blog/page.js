// src/app/main/blog/index.js
"use client";
// src/app/main/blog/index.js
import React, { useState } from "react";
import { 
  Container, Typography, Grid, Card, CardContent, CardActions, Button, Avatar, 
  TextField, IconButton, Collapse 
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";

const mockPosts = [
  {
    id: 1,
    user: "Jane Doe",
    avatar: "/user1.jpg",
    date: "October 29, 2024",
    goal: "Completed a 5K run in 30 minutes",
    comments: [{ user: "Alice", text: "Great job!" }],
    likes: 15,
  },
  {
    id: 2,
    user: "John Smith",
    avatar: "/user2.jpg",
    date: "October 28, 2024",
    goal: "Lost 5 pounds in 2 weeks",
    comments: [{ user: "Bob", text: "Congrats!" }],
    likes: 20,
  },
];

const BlogPage = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [expandedPost, setExpandedPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleToggleComments = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleAddComment = (id) => {
    if (newComment.trim() === "") return;

    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            comments: [...post.comments, { user: "CurrentUser", text: newComment }],
          }
        : post
    );
    setPosts(updatedPosts);
    setNewComment("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Friends' Achievements
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar alt={post.user} src={post.avatar} sx={{ width: 56, height: 56 }} />
                  </Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.user}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.date}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                  {post.goal}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<FavoriteIcon />}
                  onClick={() => handleLike(post.id)}
                >
                  {post.likes} Likes
                </Button>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<CommentIcon />}
                  onClick={() => handleToggleComments(post.id)}
                >
                  {post.comments.length} Comments
                </Button>
              </CardActions>
              <Collapse in={expandedPost === post.id} timeout="auto" unmountOnExit>
                <CardContent>
                  {post.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      <strong>{comment.user}:</strong> {comment.text}
                    </Typography>
                  ))}
                  <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton color="primary" onClick={() => handleAddComment(post.id)}>
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
