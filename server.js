require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const knex = require('knex');

const app = express();
const PORT = process.env.PORT || 3001;

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
      
      // Insert sample data
      await db('reels').insert([
        {
          title: 'Amazing sunset at the beach',
          author: 'Jane Smith',
          username: '@jane_videos',
          likes: 4523,
          comments: 142,
          video_url: 'https://example.com/video1.mp4'
        },
        {
          title: 'Mountain hiking adventure',
          author: 'Mike Johnson',
          username: '@mike_travels',
          likes: 2198,
          comments: 89,
          video_url: 'https://example.com/video2.mp4'
        },
        {
          title: 'DIY home decor ideas',
          author: 'Sarah Williams',
          username: '@sarah_creates',
          likes: 7845,
          comments: 356,
          video_url: 'https://example.com/video3.mp4'
        },
        {
          title: '5-minute workout routine',
          author: 'Alex Peterson',
          username: '@alex_fitness',
          likes: 3567,
          comments: 124,
          video_url: 'https://example.com/video4.mp4'
        }
      ]);
      
      console.log('Reels table created and sample data inserted');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

// Routes
app.get('/api/reels', async (req, res) => {
  try {
    const reels = await db.select('*').from('reels').orderBy('created_at', 'desc');
    res.json(reels);
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