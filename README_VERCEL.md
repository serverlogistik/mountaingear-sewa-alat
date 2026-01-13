# 🚀 Vercel Deployment Guide

## 📋 Setup untuk Vercel

### **📁 Struktur Folder:**
```
g:/STUDY/
├── 📄 login.html          # Login page
├── 📄 index.html          # Main website  
├── 📄 admin.html          # Admin dashboard
├── 📄 vercel.json         # Vercel config
├── 📁 api/
│   └── 📄 index.js        # Serverless API
└── 📄 user_data.json      # User data storage
```

## 🔧 **Cara Deploy ke Vercel:**

### **1. Install Vercel CLI**
```bash
npm install -g vercel
```

### **2. Login ke Vercel**
```bash
vercel login
```

### **3. Deploy**
```bash
vercel --prod
```

## 🌐 **URL Setelah Deploy:**

### **Main Website:**
- https://your-project.vercel.app

### **API Endpoints:**
- POST https://your-project.vercel.app/api/login
- GET https://your-project.vercel.app/api/users
- DELETE https://your-project.vercel.app/api/clear-data

### **Admin Dashboard:**
- https://your-project.vercel.app/admin

## ✨ **Fitur yang Aktif:**

### **🔐 User Login:**
- Input username/password
- Data collection ke server
- Real-time notifications
- Auto-redirect ke main website

### **📊 Admin Dashboard:**
- Real-time user data display
- Search & filter functionality
- Export JSON/CSV
- Charts & analytics
- Clear data management

### **💾 Data Storage:**
- Serverless file storage
- Persistent user data
- Complete user information
- Location & device tracking

## 🎯 **Keuntungan Vercel:**

- ✅ **Free tier** - 100GB bandwidth
- ✅ **Serverless** - No server management
- ✅ **Global CDN** - Fast loading
- ✅ **Auto HTTPS** - Secure connection
- ✅ **Custom domain** - Bisa pakai domain sendiri
- ✅ **GitHub integration** - Auto-deploy dari repo

## 🧪 **Testing Steps:**

### **1. Local Testing:**
```bash
# Install dependencies
npm install

# Jalankan lokal
vercel dev
```

### **2. Production Testing:**
1. Buka login page
2. Test user login
3. Cek admin dashboard
4. Verify data collection

## 📝 **Environment Variables:**
```bash
NODE_ENV=production
```

## 🔍 **Debug Mode:**
```bash
# Enable debug logs
DEBUG=*
```

---

**Ready for Vercel deployment! 🚀**
