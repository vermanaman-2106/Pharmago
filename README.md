# PharmaGo - Healthcare Landing Page

A modern, responsive React.js landing page for PharmaGo, a hackathon project that helps users find, compare, and get medicines faster.

## 🚀 Features

- **Modern Design**: Clean, professional healthcare startup aesthetic
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Search**: Mock medicine search with results modal
- **Color Palette**: Custom healthcare-focused color scheme
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🎨 Design System

### Color Palette
- **Primary Blue**: #BBDCE5 (section backgrounds)
- **Cream**: #ECEEDF (base background)
- **Beige**: #D9C4B0 (feature/FAQ cards)
- **Brown**: #CFAB8D (CTA buttons & highlights)
- **Dark**: #333333 (text color)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 🛠️ Tech Stack

- **React.js** 18.2.0
- **Tailwind CSS** 3.3.0
- **PostCSS** 8.4.24
- **Autoprefixer** 10.4.14

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js          # Sticky navigation with mobile menu
│   ├── Hero.js            # Hero section with search functionality
│   ├── Features.js        # Why choose PharmaGo section
│   ├── Testimonials.js    # Customer testimonials
│   ├── FAQ.js             # Accordion-style FAQ section
│   └── Footer.js          # Footer with links and social icons
├── App.js                 # Main app component with search modal
├── index.js               # React entry point
└── index.css              # Global styles and Tailwind imports
```

## ✨ Key Features Implemented

### Header
- Sticky navigation bar
- Responsive mobile menu
- Login/Sign Up buttons (mock)
- Shopping cart icon

### Hero Section
- Gradient background with decorative elements
- Prominent tagline and search bar
- Trust indicators
- Scroll indicator

### Features Section
- 4 feature cards with icons
- Statistics section
- Hover animations

### Testimonials
- 3 customer testimonials
- Star ratings
- Call-to-action section

### FAQ Section
- Accordion-style expandable questions
- Smooth animations
- Contact support CTA

### Footer
- Social media links
- Quick navigation
- Support links
- Copyright information

## 🔍 Mock Functionality

- **Search Bar**: Enter any medicine name and click "Find Medicine" to see mock results
- **Search Results Modal**: Shows pharmacy cards with pricing, availability, and distance
- **Interactive Elements**: All buttons and links are functional (mock behavior)

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Grid**: CSS Grid and Flexbox for responsive layouts
- **Touch Friendly**: Appropriate button sizes and spacing

## 🎯 Hackathon Ready

This landing page is designed to be:
- **Professional**: Clean, modern design suitable for presentations
- **Functional**: Interactive elements demonstrate the concept
- **Scalable**: Easy to extend with additional features
- **Performance**: Optimized for fast loading

## 🚀 Next Steps

To extend this project:
1. Add backend integration for real search functionality
2. Implement user authentication
3. Add online ordering capabilities
4. Integrate with pharmacy APIs
5. Add prescription management features

---

**Built with ❤️ for healthcare accessibility**
