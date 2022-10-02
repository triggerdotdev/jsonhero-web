module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      tiny: ".5rem", // 8px
      xs: ".625rem", // 10px
      sm: ".75rem", // 12px (SmallBody)
      base: ".875rem", // 14px (Body)           <p>
      lg: "1rem", // 16px (SmallTitle)          <h3>
      xl: "1.125rem", // 18px (Title)           <h2>
      "2xl": "1.375rem", // 22px (LargeTitle)   <h1>
      "3xl": "1.5rem", // 24px
      "4xl": "1.875rem", // 30px
      "5xl": "2rem", // 32px
      "6xl": ["2.625rem", "3rem"], // 42px
      "7xl": "4rem", // 64px
      "8xl": "8rem", // 128px
    },
    extend: {
      height: {
        viewerHeight: "calc(100vh - 146px)",
        inspectorHeight: "calc(100vh - 70px)",
        jsonViewerHeight: "calc(100vh - 106px)",
        viewerHeightMinimal: "calc(100vh - 106px)",
        inspectorHeightMinimal: "calc(100vh - 30px)",
        jsonViewerHeightMinimal: "calc(100vh - 66px)",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
  variants: {
    outline: ["focus"],
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix")()],
};
