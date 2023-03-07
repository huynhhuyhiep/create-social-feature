/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#FEF452',
        primary: {
          50: "#F9F5FF",
        },
        purple: "#942F70",
        gray: {
          100: "#F2F4F7",
          700: "#344054",
          600: "#475467",
        },
      },
    },
  },
  plugins: [],
};
