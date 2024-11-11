"use client";
import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Button, Avatar, 
  TextField, IconButton, Collapse, Box, CircularProgress
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5006/goal/"; // Replace with your actual backend URL


const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const userId = localStorage.getItem("user_id") || 2; // Replace with logic to get the current user ID
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
      // Find the post in the posts array
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          if (post.liked_by_user) {
            // If the post is already liked, unlike it
            post.liked_by_user = false;
            post.likes -= 1;
          } else {
            // If the post is not liked, like it
            post.liked_by_user = true;
            post.likes += 1;
          }
        }
        return post;
      });
  
      // Update the post state with the modified array
      setPosts(updatedPosts);
  
      // Make the backend call to update like status
      axios.post(`posts/${id}/like`, null, {
        params: { user_id: userId }
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  
  const handleAddComment = async (id) => {
    if (newComment.trim() === "") return;
    const userId = localStorage.getItem("user_id") || 2;
    const userName = localStorage.getItem("user_name") || "Me";
    try {
      // Use query parameters for comment data
      await axios.post(`posts/${id}/comment`, null, {
        params: { user_id: userId, text: newComment }
      });
      const updatedPosts = posts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [...post.comments, { user: userName, text: newComment }],
            }
          : post
      );
      setPosts(updatedPosts);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

  return (
    <Container maxWidth="sm" sx={{ mt: 4, padding: { xs: 2, md: 3 }, pb: 8 }}>
  <Box 
    sx={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      backgroundColor: 'background.default', // Ensures background matches the rest of the page
      pt: 1, 
      pb: 1 
    }}
  >
    <Typography 
      variant="h4" 
      gutterBottom 
      align="center" 
      sx={{ 
        fontWeight: 'bold', 
        fontSize: { xs: '1.5rem', md: '2.125rem' } 
      }}
    >
      Friends' Achievements
    </Typography>
  </Box>
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
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {post.user}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="textSecondary">
            {post.subTitle}
          </Typography>
        }
        action={
          <Typography variant="caption" color="textSecondary">
            {post.time}
          </Typography>
        }
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
            {post.liked_by_user}
            {(post.liked_by_user === true)? (
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
      {/* Spacer for the bottom of the page */}
      <Box height="60px" />
    </Container>
  );
};

export default BlogPage;
