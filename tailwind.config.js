module.exports = {
  purge: ["./public/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
