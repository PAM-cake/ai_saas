/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        primary: "var(--primary)",
        cta: "var(--cta)",
        "cta-gold": "var(--cta-gold)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        ring: "var(--ring)",
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        'min-lg': '1024px',
        'min-md': '768px',
        'min-2xl': '1536px',
      },
    },
  },
  plugins: [],
}