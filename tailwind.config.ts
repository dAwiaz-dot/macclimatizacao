import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "mac-navy": {
          DEFAULT: "#0B2545",
          50: "#EAF0F7",
          100: "#CFDCEC",
          200: "#9FB9D9",
          300: "#6E96C6",
          400: "#3D73B3",
          500: "#1C5695",
          600: "#154277",
          700: "#0F3159",
          800: "#0B2545",
          900: "#071930",
        },
        "mac-sky": {
          DEFAULT: "#3AA8F0",
          50: "#EFF8FF",
          100: "#DCEFFE",
          200: "#B4DEFD",
          300: "#8CCDFB",
          400: "#64BCF9",
          500: "#3AA8F0",
          600: "#1C8AD1",
          700: "#166BA3",
          800: "#114E78",
        },
        ice: {
          50: "#F7FAFC",
          100: "#EEF4F9",
          200: "#E2ECF4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "airflow-gradient":
          "linear-gradient(135deg, #0B2545 0%, #154277 45%, #1C8AD1 100%)",
        "ice-gradient": "linear-gradient(180deg, #F7FAFC 0%, #EEF4F9 100%)",
      },
      keyframes: {
        "air-flow": {
          "0%": { transform: "translateX(-10%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(110%)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "air-flow": "air-flow 3.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
