/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark theme colors
        primary: '#0A0F1C',
        secondary: '#131B2E',
        // Vibrant accent colors
        accent: {
          DEFAULT: '#3B82F6',
          purple: '#8B5CF6',
          pink: '#EC4899',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          green: '#10B981'
        },
        // Text colors
        text: {
          DEFAULT: '#F8FAFC',
          secondary: '#94A3B8'
        },
        // Additional colors for gradients
        dark: {
          DEFAULT: '#0A0F1C',
          lighter: '#131B2E',
          blue: '#1E293B'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 