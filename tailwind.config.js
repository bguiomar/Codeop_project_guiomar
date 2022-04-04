const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      cursor: {
        cursor2:
          "url(https://cur.cursors-4u.net/others/oth-1/oth23.ani), url(https://cur.cursors-4u.net/others/oth-1/oth23.png), auto !important,pointer",
      },
    },
  },
  plugins: [],
};
