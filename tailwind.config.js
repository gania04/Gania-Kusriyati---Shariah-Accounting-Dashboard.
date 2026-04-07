/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // Jika kamu tetap meletakkan folder dashboard di luar 'app' (tidak disarankan):
        "./dashboard/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'emerald-primary': '#064e3b',
            },
        },
    },
    plugins: [],
}