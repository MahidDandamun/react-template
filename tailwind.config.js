module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Include all your React components for scanning
      "./src/**/**/*.{js,jsx,ts,tsx}", // Include all your React components for scanning
      "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      extend: {}, // Add your custom theme extensions here (optional)
    },
    plugins: [require('flowbite/plugin')({
      datatables: true,
      charts: true,
  })], // Add any additional Tailwind plugins if needed
  };
  