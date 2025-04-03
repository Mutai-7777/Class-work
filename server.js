require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const knex = require('knex');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Instagram API Configuration
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_API_URL = 'https://graph.instagram.com';

// Middleware - configure CORS to allow requests from our React app
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());

// PostgreSQL connection
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
});

// Create reels table if it doesn't exist
const setupDatabase = async () => {
  try {
    // Check if reels table exists
    const tableExists = await db.schema.hasTable('reels');
    if (!tableExists) {
      console.log('Creating reels table...');
      await db.schema.createTable('reels', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('username').notNullable();
        table.integer('likes').defaultTo(0);
        table.integer('comments').defaultTo(0);
        table.string('video_url');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      
      // Insert sample data with Instagram-like content
      await db('reels').insert([
        {
          title: 'Dance challenge with friends #trending',
          author: 'Jessica Lopez',
          username: 'dance_with_jess',
          likes: 45231,
          comments: 1420,
          video_url: 'https://example.com/video1.mp4'
        },
        {
          title: 'Quick tutorial: How to take professional photos with your phone 📱',
          author: 'Michael Chen',
          username: 'photo_pro_mike',
          likes: 21984,
          comments: 892,
          video_url: 'https://example.com/video2.mp4'
        },
        {
          title: 'My morning routine 🌞 #morningroutine #productivity',
          author: 'Sofia Williams',
          username: 'lifestyle_sofia',
          likes: 78451,
          comments: 3562,
          video_url: 'https://example.com/video3.mp4'
        },
        {
          title: 'Easy recipe: 1-minute chocolate mug cake 🍰 #foodie',
          author: 'Chef Alex',
          username: 'cooking_with_alex',
          likes: 35672,
          comments: 1243,
          video_url: 'https://example.com/video4.mp4'
        },
        {
          title: 'The most beautiful sunset you will ever see 😍 #travel',
          author: 'Nina Travels',
          username: 'nina_around_world',
          likes: 92147,
          comments: 4231,
          video_url: 'https://example.com/video5.mp4'
        },
        {
          title: 'Behind the scenes of my latest photoshoot 📸 #photography',
          author: 'Ryan James',
          username: 'ryan_creates',
          likes: 18294,
          comments: 753,
          video_url: 'https://example.com/video6.mp4'
        }
      ]);
      
      console.log('Reels table created and sample data inserted');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

// Instagram API Functions
async function fetchInstagramReels() {
  try {
    const response = await axios.get(`${INSTAGRAM_API_URL}/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username,like_count,comments_count',
        access_token: INSTAGRAM_ACCESS_TOKEN
      }
    });

    // Filter to only include video content (Instagram Reels/Videos)
    const reelsData = response.data.data.filter(item => 
      item.media_type === 'VIDEO' || item.media_type === 'REEL'
    );

    return reelsData;
  } catch (error) {
    console.error('Error fetching Instagram reels:', error.response?.data || error.message);
    throw new Error('Failed to fetch Instagram reels');
  }
}

async function fetchInstagramUser() {
  try {
    const response = await axios.get(`${INSTAGRAM_API_URL}/me`, {
      params: {
        fields: 'id,username,account_type,media_count',
        access_token: INSTAGRAM_ACCESS_TOKEN
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Instagram user:', error.response?.data || error.message);
    throw new Error('Failed to fetch Instagram user');
  }
}

// Routes
// Endpoint to get Instagram reels
app.get('/api/instagram/reels', async (req, res) => {
  try {
    const reelsData = await fetchInstagramReels();
    res.json(reelsData);
  } catch (error) {
    console.error('Error in Instagram reels endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get Instagram user info
app.get('/api/instagram/user', async (req, res) => {
  try {
    const userData = await fetchInstagramUser();
    res.json(userData);
  } catch (error) {
    console.error('Error in Instagram user endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// Original reels endpoint (now as a fallback)
app.get('/api/reels', async (req, res) => {
  try {
    // First try to get reels from Instagram
    try {
      const instagramReels = await fetchInstagramReels();
      
      // Map Instagram reels to our app's format
      const mappedReels = instagramReels.map((reel, index) => ({
        id: index + 1,
        title: reel.caption || 'Instagram Reel',
        author: reel.username || 'Instagram User',
        username: reel.username || 'instagram_user',
        likes: reel.like_count || 0,
        comments: reel.comments_count || 0,
        video_url: reel.media_url,
        permalink: reel.permalink,
        instagram_id: reel.id,
        created_at: reel.timestamp
      }));
      
      return res.json(mappedReels);
    } catch (instagramError) {
      console.log('Falling back to database reels due to Instagram API error:', instagramError.message);
      // If Instagram API fails, fall back to database reels
      const reels = await db.select('*').from('reels').orderBy('created_at', 'desc');
      res.json(reels);
    }
  } catch (error) {
    console.error('Error fetching reels:', error);
    res.status(500).json({ error: 'Failed to fetch reels' });
  }
});

app.post('/api/reels', async (req, res) => {
  try {
    const { title, author, username, video_url } = req.body;
    
    if (!title || !author || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const [newReel] = await db('reels')
      .insert({
        title,
        author,
        username,
        video_url,
        likes: 0,
        comments: 0
      })
      .returning('*');
    
    res.status(201).json(newReel);
  } catch (error) {
    console.error('Error creating reel:', error);
    res.status(500).json({ error: 'Failed to create reel' });
  }
});

app.put('/api/reels/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [updatedReel] = await db('reels')
      .where({ id })
      .increment('likes', 1)
      .returning('*');
    
    if (!updatedReel) {
      return res.status(404).json({ error: 'Reel not found' });
    }
    
    res.json(updatedReel);
  } catch (error) {
    console.error('Error liking reel:', error);
    res.status(500).json({ error: 'Failed to like reel' });
  }
});

// Initialize database and start server
setupDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
  });