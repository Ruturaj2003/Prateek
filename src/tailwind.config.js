module.exports = {
  content: ['./*.html','../components/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "...sans-serif"],
        body: ["Roboto", "...sans-serif"],
        mono: ["ui-monospace", "...monospace"],
      },
      backgroundImage: {
        'custom-background': "url('your-image-url')",
      },
    },
  },
  plugins: [],
}

