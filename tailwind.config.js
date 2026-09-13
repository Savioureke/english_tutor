/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#525fe1",
          primaryHover: "#f26b65",
          coral: "#f26b65",
          navy: "#0b104a",
          dark: "#141b2d",
          body: "#4a5355",
          lightGray: "#f8f9fc",
          border: "#e2e8f0",
          accentOrange: "#ffa41b",
          accentGreen: "#28a745"
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        jost: ['"Jost"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1320px',
        }
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px rgba(82, 95, 225, 0.12)',
        'header': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
