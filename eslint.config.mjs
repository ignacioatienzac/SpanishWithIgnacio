import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";

export default [
    // 1. Configuración para archivos JavaScript (.js)
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser, // Añade globales de navegador (document, fetch, etc.)
                "flatpickr": "readonly" // Define 'flatpickr' para que ESLint no dé error
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn", // Avisa de variables no usadas
            "no-undef": "warn" // Avisa de variables no definidas
        }
    },

    // 2. Configuración para archivos CSS (.css)
    {
        files: ["**/*.css"],
        ...css.configs.recommended
    },

    // 3. Configuración para archivos JSON (.json)
    {
        files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
        ...json.configs.recommended
    },

    // 4. Configuración para archivos Markdown (.md)
    {
        files: ["**/*.md"],
        ...markdown.configs.recommended
    },

    // 5. Ignorar la carpeta node_modules globalmente
    {
        ignores: ["node_modules/"]
    }
];
