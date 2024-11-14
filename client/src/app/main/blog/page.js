"use client";
import React, { useState, useEffect } from "react";
import {
  Container, Typography, Grid, Card, CardHeader, CardMedia, CardContent, TextField,
  IconButton, Collapse, Box, CircularProgress, Avatar
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

axios.defaults.baseURL = "http://13.54.17.246:5006/goal/";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const userId = localStorage.getItem("user_id") || 2;
      try {
        const response = await axios.get(`posts/`, {
          params: { user_id: userId }
        });
        setPosts(response.data);
        console.log("Fetched posts:", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleToggleComments = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleLike = async (id) => {
    const userId = localStorage.getItem("user_id") || 2;
    try {
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          post.liked_by_user = !post.liked_by_user;
          post.likes += post.liked_by_user ? 1 : -1;
        }
        return post;
      });
      setPosts(updatedPosts);
      await axios.post(`posts/${id}/like`, null, { params: { user_id: userId } });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleAddComment = async (id) => {
    if (newComment.trim() === "") return;
    const userId = localStorage.getItem("user_id") || 2;
    const userName = localStorage.getItem("user_name") || "Me";
    try {
      await axios.post(`posts/${id}/comment`, null, {
        params: { user_id: userId, text: newComment }
      });
      const updatedPosts = posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, { user: userName, text: newComment }] }
          : post
      );
      setPosts(updatedPosts);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      {/* Add the font import here */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');`}
      </style>

      {/* Full-Screen Hero Section */}
      <Box 
        sx={{ 
          position: 'relative', // Ensure it's relative to the viewport
          height: '40vh', // Full viewport height
          width: '100%', // Full viewport width
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          backgroundImage: `url('/forumbg.jpg')`, // Replace with your image path
          backgroundSize: 'cover', // Ensures the image covers the entire hero section
          backgroundPosition: 'center', // Centers the image
          backgroundRepeat: 'no-repeat', // Prevents tiling
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontFamily: 'Anton, sans-serif', 
            color: '#c1ff72', 
            fontWeight: 500, 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.2,
            letterSpacing: '0.02em',
          }}
        >
          Friend's Achievement
        </Typography>
      </Box>

      {/* Main Content Container */}
      <Container maxWidth="sm" sx={{ mt: 2, padding: { xs: 2, md: 3 }, pb: 8 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 2, maxWidth: 600, margin: 'auto' }}>
                  <CardHeader
                    avatar={<Avatar alt={post.user} src={post.avatar} />}
                    title={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{post.user}</Typography>}
                    subheader={<Typography variant="caption" color="textSecondary">{post.subTitle}</Typography>}
                    action={<Typography variant="caption" color="textSecondary">{post.time}</Typography>}
                  />
                  <CardContent sx={{ pb: 0 }}>
                    <Typography variant="body2" color="textPrimary">
                      {post.goal}
                    </Typography>
                  </CardContent>
                  {post.image && (
                    <CardMedia
                      component="img"
                      image={post.image}
                      alt="Post image"
                      sx={{ borderRadius: 1, marginTop: 1 }}
                    />
                  )}
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        aria-label="like"
                        size="small"
                        color="primary"
                        onClick={() => handleLike(post.id)}
                      >
                        {post.liked_by_user ? (
                          <FavoriteIcon fontSize="small" color="primary"/>
                        ) : (
                          <FavoriteIcon fontSize="small" color="disabled" />
                        )}
                      </IconButton>
                      <Typography variant="caption" color="textSecondary" sx={{ ml: 0.5 }}>
                        {post.likes} Likes
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        aria-label="comment"
                        size="small"
                        color="primary"
                        onClick={() => handleToggleComments(post.id)}
                      >
                        <CommentIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption" color="textSecondary" sx={{ ml: 0.5 }}>
                        {post.comments.length} Comments
                      </Typography>
                    </Box>
                  </CardContent>
                  <Collapse in={expandedPost === post.id}>
                    <CardContent>
                      {post.comments.map((comment, index) => (
                        <Typography key={index} sx={{ mb: 1 }}>
                          <strong>{comment.user}:</strong> {comment.text}
                        </Typography>
                      ))}
                      <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                          fullWidth
                          size="small"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                        />
                        <IconButton onClick={() => handleAddComment(post.id)}>
                          <SendIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Box height="60px" />
      </Container>
    </>
  );
};

export default BlogPage;
