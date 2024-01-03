/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1537px", // Tạo một breakpoint mới cho màn hình lớn hơn 1536px
      },
      colors: {
        orange: "#ee4d2d",
        yellow: "#ffc20e",
        "main-theme": "#e3edf9",
        green: "#28a745",
        red: "#e23d31",
      },
    },
  },
  plugins: [],
};
