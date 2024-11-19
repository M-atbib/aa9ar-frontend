import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0249AB",
        secondary: "#FEBD58",
        darkText: "#1A1A1A",
        white: "#FFFFFF",
        offWhite: "#F2F2F2",
        tabColor: "#FEF7FF",
        oldNa: "#000E21",
        navbar: "#0D1A2C",
        projectList: "#0D1A2C",
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        xs: "4px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        primaryGradient:
          "linear-gradient(to right top, #031D42 20%, #074AA8 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
