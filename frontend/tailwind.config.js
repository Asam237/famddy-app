/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            container: {
                center: true, padding: {
                    DEFAULT: "1rem", md: "4rem", lg: "5rem", xk: "5rem",
                },
            },
        },
    },
    plugins: [function ({addComponents}) {
        addComponents({
            ".container": {
                maxWidth: "90vw", marginLeft: "auto", marginRight: "auto", "@screen md": {
                    maxWidth: "90vw",
                }, "@screen lg": {
                    maxWidth: "85vw",
                }, "@screen xl": {
                    maxWidth: "85vw",
                },
            },
        })
    }],
};
