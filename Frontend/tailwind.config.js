<<<<<<< Updated upstream
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
=======
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
>>>>>>> Stashed changes
  theme: {
    extend: {},
  },
  plugins: [],
<<<<<<< Updated upstream
}
=======
  prefix: "hazem-",
  corePlugins: {
    preflight: false,
  },
});
>>>>>>> Stashed changes
