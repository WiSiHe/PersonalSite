/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./app/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./pages/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/container-queries"),

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("tailwindcss-themer")({
            defaultTheme: {
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
                    fontFamily: {
                        inter: ["var(--font-inter)", "sans-serif"],
                        oswald: ["var(--font-oswald)", "sans-serif"],
                    },
                    colors: {
                        primary: "#DE0D92",
                        secondary: "#31493C",
                        tertiary: "#F2F2F2",
                        dark: "#2B061E",
                        shadow: "#203647",
                        highlight: "#FAE20C",
                        bright: "#C2CACD",
                    },
                },
            },
            themes: [
                {
                    name: "dark",
                    extend: {
                        colors: {
                            // here I'm overriding a custom default too
                            primary: "red",
                            secondary: "blue",
                            tertiary: "green",
                            dark: "purple",
                            shadow: "orange",
                            highlight: "pink",
                            bright: "yellow",
                        },
                    },
                },
                {
                    name: "neon",
                    extend: {
                        colors: {
                            secondary: "#green",
                            primary: "yellow",
                            // im not overwriting the custom primary color I made ... I wonder what will happen ??? 🤔🤔🤔
                        },
                    },
                },
            ],
        }),
        // ...
    ],
}
