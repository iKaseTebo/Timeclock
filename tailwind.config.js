/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",    // For Next.js 13 App Router
      "./src/pages/**/*.{js,ts,jsx,tsx}",  // Legacy Next.js pages
      "./src/components/**/*.{js,ts,jsx,tsx}", // Your components folder
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };