/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript'
    ],
    overrides: [
        {
            files: [
                '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
                'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'
            ],
            'extends': [
                'plugin:cypress/recommended'
            ]
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        "indent": [
            "warn",
            4
        ],
        "linebreak-style": [
            "warn",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error"
        ]
    },
}
