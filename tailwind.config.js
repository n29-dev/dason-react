module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                blue: {
                    DEFAULT: '#1c84ee',
                    100: '#1c84ee1a',
                },
                white: {
                    DEFAULT: '#ffffff',
                    300: '#f4f5f8',
                    400: '#f8f9fa',
                    500: '#e9ecef',
                    600: '#74788d1a',
                },
                dark: {
                    300: '#74788d',
                    400: '#545a6d',
                    500: '#495057',
                    600: '#2b3940',
                },
                success: {
                    100: '#34c38f40',
                    DEFAULT: '#34c38f',
                },
                danger: {
                    100: '#ef676740',
                    DEFAULT: '#ef6767',
                },
            },
        },
    },
    plugins: [],
};
