/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB6C1',      // 粉色
        'primary-dark': '#FF69B4',
        secondary: '#87CEEB',   // 天蓝色
        accent: '#FFD700',      // 金色星星
        background: '#FFF5F5',
        card: '#FFFFFF',
        text: {
          primary: '#333333',
          secondary: '#666666',
          muted: '#999999',
        },
        emotion: {
          happy: '#FFD700',
          sad: '#87CEEB',
          angry: '#FF6B6B',
          fear: '#9370DB',
          tired: '#DDA0DD',
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
