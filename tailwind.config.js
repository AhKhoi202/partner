module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      width: {
        '1100':'1100px'
      },
      backgroundColor:{
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#f73859'
      },
      maxWidth:{
        '750':'750px'
      },
      boxShadow: {
        'xl': '0 0 25px rgba(0, 0, 0, 0.3)',
      },
      top: {
        '-5':'-5px'
      }
    },
  },
  plugins: [],
}

