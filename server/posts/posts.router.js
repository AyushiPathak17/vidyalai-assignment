const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const photos = response.data;

        const images = photos.map(photo => ({ url: photo.url }));

        return {
          ...post,
          images,
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts or photos' });
  }
});

module.exports = router;
