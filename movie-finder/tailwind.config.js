module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    corePlugins: {
      preflight: false, // Disable Tailwind's base/reset styles
    },
    plugins: [],
  }