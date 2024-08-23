const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        accent: "#38b2ac",
        danger: "#e3342f",
        bw: "#ffff",
      },
    },
  },

  plugins: [
    require("daisyui"),
    function ({ addBase, theme }: any) {
      let allColors = require("tailwindcss/lib/util/flattenColorPalette")(
        theme("colors")
      );

      let filteredColors = Object.fromEntries(
        Object.entries(allColors).filter(
          ([key, val]) => !/oklch/.test(val as string)
        )
      );

      addBase({
        ":root": Object.fromEntries(
          Object.entries(filteredColors).map(([key, val]) => [`--${key}`, val])
        ),
      });
    },
  ],
};


function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
