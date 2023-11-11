
/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
export default{
  content: ['./src/**/*.{js,jsx,ts,tsx}','node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
  corePlugins: {
    preflight: false,
  },
};

