module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        // Vous pouvez personnaliser des couleurs ou styles ici
      },
    },
    plugins: [
      // Ajoutez des plugins si nécessaire
    ],
    // Cette option est importante pour éviter que d'autres CSS n'écrasent Tailwind
    important: true,
  }