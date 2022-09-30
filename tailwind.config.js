module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                blue: 'rgb(28 132 238)',
                white: {
                    DEFAULT: '#ffffff',
                    300: '#f4f5f8',
                    400: '#f8f9fa',
                    500: '#e9ecef',
                },
                dark: {
                    300: '#74788d',
                    500: '#495057',
                    600: '#2b3940',
                },
            },
        },
    },
    plugins: [],
};
