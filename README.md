# Aionion Advisory - Professional Tax Filing Website

A modern, professional React.js web application for a Chartered Accountant firm providing Income Tax Filing, GST services, Company Registration, and Compliance services in India.

## 🚀 Features

### Pages
- **Home Page** - Hero section, trust badges, how-it-works, services overview, features, testimonials
- **Services Page** - Detailed service offerings with pricing and features
- **ITR Filing Page** - Multi-step tax filing form with progress tracking
- **Dashboard** - User dashboard with filed returns and status tracking
- **Contact Page** - Enquiry form with WhatsApp integration

### Design Highlights
- 🎨 Modern, clean fintech-inspired UI/UX
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎯 Professional color scheme (Deep Blue, Green, Orange accents)
- 🔒 Trust-focused design elements
- ⚡ Fast performance with React + Vite

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS with CSS Variables
- **Icons**: SVG inline icons
- **Fonts**: Google Fonts (Inter)

## 📦 Installation

```bash
# Navigate to project directory
cd tax-filing-react

# Install dependencies
npm install

# Start development server
npm run dev

# This will start the server at http://localhost:3000
```

## 🏗️ Project Structure

```
tax-filing-react/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Services.jsx
│   │   ├── Services.css
│   │   ├── ITRFiling.jsx
│   │   ├── ITRFiling.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: #0066FF (Trust Blue)
- **Secondary**: #10B981 (Growth Green)
- **Accent**: #F97316 (Action Orange)
- **Neutrals**: Gray scale from 50-900

### Typography
- **Font Family**: Inter (Google Fonts)
- **Sizes**: Responsive scale from 0.75rem to 3.75rem
- **Weights**: 300 (Light) to 800 (Extrabold)

### Components
- Responsive navigation with mobile menu
- Animated hero sections
- Card-based layouts
- Step-by-step forms with progress tracking
- Toast notifications system (in utilities)
- Modal-ready architecture

## 📱 Pages Overview

### 1. Home (`/`)
- Hero section with CTA buttons
- Trust badges (CA Verified, 100% Secure, Govt Compliant)
- How It Works (4-step process)
- Services overview cards
- Why Choose Us features
- Client testimonials
- Call-to-action section

### 2. Services (`/services`)
- Page hero with description
- Detailed service cards with:
  - ITR Filing (₹499+)
  - GST Registration (₹999+)
  - Company Registration (₹6,999+)
  - Accounting & Bookkeeping (₹2,999/mo)
  - Compliance & Advisory
  - TDS Return Filing (₹1,499/qtr)

### 3. ITR Filing (`/itr-filing`)
Multi-step form interface:
1. Login/Register with OTP
2. Select ITR Type (ITR-1 to ITR-4)
3. Upload Documents
4. Review Details
5. Payment
6. Success Confirmation

### 4. Dashboard (`/dashboard`)
- Welcome card with quick actions
- Stats overview (Filed Returns, Pending, Refund)
- Returns table with download options
- Status tracking

### 5. Contact (`/contact`)
- Contact form with validation
- Email, phone, office location
- WhatsApp quick support button
- Service selection dropdown

## 🚀 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

The build will be created in the `dist/` folder.

## 🎯 Key Features Implementation

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly interactive elements

### Performance
- Vite for fast HMR (Hot Module Replacement)
- Code splitting with React.lazy (can be added)
- Optimized SVG icons
- CSS variables for consistent theming

### User Experience
- Smooth page transitions
- Form validation
- Progress indicators
- Loading states
- Success/Error feedback

## 📝 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
    --color-primary: #0066FF;
    --color-secondary: #10B981;
    /* ... more variables */
}
```

### Content
- Update text content in respective `.jsx` files
- Modify service pricing in `Services.jsx` and `Home.jsx`
- Change contact information in `Footer.jsx` and `Contact.jsx`

## 🔧 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication (Firebase/Auth0)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Document upload to cloud storage
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Blog section
- [ ] Multi-language support

## 📄 License

This project is created for TaxPro India. All rights reserved.

## 👨‍💻 Developer

Built with ⚡ using React + Vite

---

**Note**: This is a frontend-only implementation. For production use, integrate with a backend API for data persistence, authentication, and payment processing.
