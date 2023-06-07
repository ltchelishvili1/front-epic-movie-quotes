module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "dark-shadow":
          "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
        "dark-bg":
          "linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)",
        "landing-page-shadow":
          "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%)",
      }),
    },
  },
  plugins: [],
};
