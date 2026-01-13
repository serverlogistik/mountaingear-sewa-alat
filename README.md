# MountainGear - Sewa Alat Pendakian

Website profesional untuk sewa alat pendakian dengan sistem login Instagram.

## 🚀 Fitur

### 🎯 **Main Features**
- **Login System**: Wajib login melalui Instagram atau manual
- **Equipment Catalog**: 8+ jenis alat pendakian dengan filter kategori
- **Booking System**: Form pemesanan lengkap dengan cart
- **Tips & Guide**: Panduan pendakian yang aman
- **Responsive Design**: Optimal di desktop, tablet, dan mobile

### 🔐 **Authentication**
- Instagram OAuth integration
- Manual login form
- User session management
- Profile management

### 📦 **Equipment Categories**
- Pembawaan (Carrier, Trekking Pole)
- Pakaian (Jacket, Sepatu Gunung)
- Keselamatan (Headlamp)
- Kemah (Tent, Sleeping Bag, Cooking Set)

## 🧪 Testing

### **Login Test**
1. Buka `login.html`
2. Pilih login method:
   - **Instagram OAuth** (demo mode)
   - **Manual Login** (input username/password)
3. Data user otomatis tersimpan di `user_data.json`

### **Main Website Test**
1. Setelah login, redirect ke `index.html`
2. Browse equipment catalog
3. Add items to cart
4. Fill booking form
5. Submit order

## 📁 File Structure

```
├── index.html          # Main website
├── login.html          # Login page
├── user_data.json      # User data storage
├── README.md           # Documentation
└── assets/             # Images & resources (auto-generated)
```

## 🛠️ Teknologi

- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Icons**: Font Awesome 6
- **Images**: Unsplash API
- **Storage**: LocalStorage + JSON file

## 📱 Responsive

- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

## 🔧 Setup

1. Clone/download repository
2. Buka `login.html` di browser
3. Test login flow
4. Akses `index.html` setelah login

## ⚠️ Important

- Website memerlukan login untuk akses penuh
- Data user tersimpan lokal di `user_data.json`
- Tidak memerlukan server/database
- Bisa di-hosting di GitHub Pages, Netlify, atau Vercel

## 🌐 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Netlify/Vercel
- Drag & drop folder ke dashboard
- Auto-deploy dari GitHub

## 📄 License

MIT License - Free untuk penggunaan komersial dan personal

---

**MountainGear** © 2024 - Sewa Alat Pendakian Profesional
