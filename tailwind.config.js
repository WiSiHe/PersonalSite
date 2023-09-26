/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./app/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./pages/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            aspectRatio: {
                portrait: "12 / 16",
            },
            height: {
                screen: [
                    "100vh /* fallback for Opera, IE and etc. */",
                    "100dvh",
                ],
            },
            minHeight: {
                screen: [
                    "100vh /* fallback for Opera, IE and etc. */",
                    "100dvh",
                ],
            },
            maxWidth: {
                "screen-3xl": "1920px",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                blob: "blob 20s ease-in-out infinite",
                "gradient-x": "gradient-x 15s ease-in-out infinite",
                "gradient-y": "gradient-y 15s ease-in-out infinite",
                "gradient-xy": "gradient-xy 15s linear infinite",
                progress: "progress 15s linear infinite",
                tilt: "tilt 10s linear infinite",
                "animated-gradient":
                    "animated-gradient 10s ease-in-out infinite",
            },
            keyframes: {
                "gradient-y": {
                    "0%, 100%": {
                        "background-size": "400% 400%",
                        "background-position": "center top",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "center center",
                    },
                },
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                "gradient-xy": {
                    "0%, 100%": {
                        "background-size": "400% 400%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                "animated-gradient": {
                    "0%": {
                        "background-position": "0% 50%",
                    },
                    "50%": {
                        "background-position": "100% 50%",
                    },
                    "100%": {
                        "background-position": "0% 50%",
                    },
                },
                blob: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    // transform position and scale
                    "33.33%": {
                        transform: "translate(30px, -50px) scale(1.5)",
                    },
                    "66.6%": {
                        transform: "translate(-20px, 30px) scale(1)",
                    },
                },
                progress: {
                    "0%": {
                        width: "0%",
                    },
                    "100%": {
                        width: "100%",
                    },
                },
                tilt: {
                    "0%, 100%": {
                        transform: "rotate(0deg)",
                    },
                    "25%": {
                        transform: "rotate(5deg)",
                    },
                    "75%": {
                        transform: "rotate(-5deg)",
                    },
                },
            },
            fontFamily: {
                inter: ["var(--font-inter)", "sans-serif"],
                oswald: ["var(--font-oswald)", "sans-serif"],
            },
            colors: {
                dark: "#2B061E",
                primary: "#DE0D92",
                secondary: "#31493C",
                tertiary: "#F2F2F2",
                shadow: "#203647",
                highlight: "#FAE20C",
                bright: "#C2CACD",
            },
        },
    },
    plugins: [require("@tailwindcss/container-queries")],
}
