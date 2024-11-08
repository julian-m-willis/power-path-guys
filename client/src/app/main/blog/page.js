// src/app/main/blog/index.js
"use client";
import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Grid, Card, CardContent, CardActions, Button, Avatar, 
  TextField, IconButton, Collapse, Box, CircularProgress
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Uncomment to fetch data
        // const response = await axios.get("https://your-backend-api.com/api/posts");
        // setPosts(response.data);
        console.log("Fetched posts:", posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);

    try {
      // Uncomment to send a like update to the backend
      // await axios.post(`https://your-backend-api.com/api/posts/${id}/like`);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleToggleComments = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleAddComment = async (id) => {
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

    try {
      // Uncomment to send the new comment to the backend
      // await axios.post(`https://your-backend-api.com/api/posts/${id}/comments`, {
      //   user: "CurrentUser",
      //   text: newComment
      // });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, padding: { xs: 2, md: 3 }, pb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Friends' Achievements
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar alt={post.user} src={post.avatar} sx={{ width: 48, height: 48 }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {post.user}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {post.date}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                    {post.goal}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleLike(post.id)}>{post.likes} Likes</Button>
                  <Button onClick={() => handleToggleComments(post.id)}>{post.comments.length} Comments</Button>
                </CardActions>
                <Collapse in={expandedPost === post.id}>
                  <CardContent>
                    {post.comments.map((comment, index) => (
                      <Typography key={index}><strong>{comment.user}:</strong> {comment.text}</Typography>
                    ))}
                    <Grid container>
                      <TextField fullWidth size="small" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                      <IconButton onClick={() => handleAddComment(post.id)}><SendIcon /></IconButton>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {/* Spacer for the bottom of the page */}
      <Box height="60px" />
    </Container>
  );
};

export default BlogPage;
