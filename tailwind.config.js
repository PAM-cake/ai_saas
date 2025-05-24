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
        primary: "var(--primary)",
        cta: "var(--cta)",
        "cta-gold": "var(--cta-gold)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        // ...other colors
      },
      backgroundColor: {
        background: "var(--background)",
      },
      // ...existing code...
    },
    // ...existing code...
  },
  plugins: [],
}