module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint-config-airbnb',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'],
                paths: ['src'],
            },
        },
    },
    rules: {
        indent: ['error', 4],
        'class-methods-use-this': 'off',
        'linebreak-style': 'off',
    },
};
