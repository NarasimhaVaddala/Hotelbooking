const { Container } = require("postcss");

// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      container:{
        center:true,
        padding:"2rem"
      }
    },
  },
  plugins: [],
};
