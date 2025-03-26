require('dotenv').config();
const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Rate limiting (200 reqs/hour)
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after an hour'
});

// Instagram OAuth proxy endpoint
app.post('/api/auth/instagram', apiLimiter, async (req, res) => {
  try {
    const { code } = req.body;
    
    const response = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
      code
    });

    // Return token with expiration
    res.json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      user_id: response.data.user_id
    });
  } catch (error) {
    res.status(400).json({ error: 'Authentication failed' });
  }
});

// Token refresh endpoint
app.post('/api/auth/refresh', apiLimiter, async (req, res) => {
  const { refreshToken } = req.body;
  // Implementation would use Instagram's refresh_token flow
});

// Media proxy endpoint
app.get('/api/media/:id', apiLimiter, async (req, res) => {
  // Add media caching logic here
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
