# AI Interview Platform

A modern, responsive React frontend for an AI-powered interview platform built with Vite.

## ✨ Features

### 🎨 UI Components
- **Fixed Header**: Clean, modern header with platform title and subtle shadow
- **Dual Video Layout**: Side-by-side video panels for candidate and interviewer
- **Confidence Overlay**: Real-time confidence score display with color-coded indicators
- **Start Button**: Interactive button to initiate webcam access

### 📱 Responsive Design
- **Desktop**: Side-by-side video layout (45% width each)
- **Mobile**: Stacked video layout (100% width)
- **Tablet**: Flexible layout with proper spacing

### 🎯 React Hooks Usage
- `useState`: Managing confidence score, webcam state, and loading state
- `useRef`: DOM references for video elements
- `useEffect`: Simulating real-time confidence updates

### 🔧 Functionality
- **Webcam Access**: Uses `navigator.mediaDevices.getUserMedia`
- **Video Streaming**: Attaches user media stream to video element
- **Error Handling**: Graceful handling of camera permission errors
- **Dynamic Confidence**: Simulated confidence score updates every 3 seconds

## 🏗️ Component Structure

```
src/
├── components/
│   ├── Header.jsx              # Fixed header component
│   ├── VideoPanel.jsx          # Video display with placeholder
│   ├── ConfidenceOverlay.jsx   # Floating confidence indicator
│   └── StartButton.jsx         # Interview start button
├── App.jsx                     # Main application component
├── App.css                     # Responsive styles and animations
├── index.css                   # Global styles
└── main.jsx                    # Application entry point
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#3b82f6) for buttons and accents
- **Success**: Green (#10b981) for high confidence
- **Warning**: Yellow (#f59e0b) for medium confidence  
- **Error**: Red (#ef4444) for low confidence
- **Background**: Light gray (#f9fafb) for clean appearance

### Interactive Elements
- **Hover Effects**: Subtle transforms and shadow changes
- **Button States**: Loading, disabled, and active states
- **Animations**: Pulse effect for confidence overlay
- **Transitions**: Smooth 0.2s ease-in-out for all interactions

### Typography
- **Font**: System font stack for optimal performance
- **Hierarchy**: Clear heading and text sizing
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔮 Future Enhancements

- WebRTC integration for interviewer video
- Backend API integration
- Recording functionality
- Chat/messaging system
- Screen sharing capabilities
- TypeScript migration
- Tailwind CSS integration
- Advanced confidence algorithms

## 📱 Browser Compatibility

- Chrome 88+ (recommended)
- Firefox 86+
- Safari 14+
- Edge 88+

Requires camera permissions for full functionality.

## 🛠️ Built With

- **React 19.1.0** - UI Framework
- **Vite 6.3.5** - Build Tool
- **ESLint** - Code Linting
- **Modern CSS** - Styling and Animations

---

Ready for the next phase of development! 🎯+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
