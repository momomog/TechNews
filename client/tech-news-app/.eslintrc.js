const path = require('path')

module.exports = {
    root: true,
    // parser: 'babel-eslint',  // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
        // 'airbnb-typescript'
    ],
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: "module",  // Allows for the use of imports
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname),
        ecmaFeatures: {
            jsx: true  // Allows for the parsing of JSX
        }
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'eslint-plugin-node'
    ],
    env: {
        es6: true,
        browser: true,
        node: true
    },
    rules: {
        camelcase: "warn",
        "no-debugger": "error",
        "react/no-unescaped-entities": ["off"],
        "@typescript-eslint/no-use-before-define": ["warn", {functions: false}],
        "@typescript-eslint/no-empty-function": ["off"],
        "no-use-before-define": ["warn", {functions: false}],
        "@typescript-eslint/explicit-function-return-type": [
            "off",
            {
                allowVoid: true
            }
        ],
        "@typescript-eslint/member-delimiter-style": ["warn", {
            multiline: {
                delimiter: 'none',
                requireLast: false
            },
            singleline: {
                delimiter: 'comma',
                requireLast: false
            }
        }],
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "default",
                "format": ["camelCase"]
            },
            {
                "selector": "variable",
                "format": ["camelCase", "UPPER_CASE", "PascalCase"]
            },
            {
                "selector": "parameter",
                "format": ["camelCase"],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "typeLike",
                "format": ["PascalCase"]
            }
        ],
        semi: "off",
        "no-unused-vars": "warn"
    },
    globals: {
        "global": false,
        "Promise": false
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['./src']
            }
        },
        react: {
            version: 'detect'
        }
    }
}