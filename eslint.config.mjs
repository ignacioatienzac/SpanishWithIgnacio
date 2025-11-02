import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";

export default [
    // 1. Configuración para archivos JavaScript (.js)
    {
        ...js.configs.recommended,
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser, // Añade globales de navegador (document, fetch, etc.)
                "flatpickr": "readonly" // Añade flatpickr como global conocido
            }
        }
    },
    
    // 2. Configuración para archivos CSS (.css)
    {
        ...css.configs.recommended,
        files: ["**/*.css"]
    },
    
    // 3. Configuración para archivos JSON (.json)
    {
        ...json.configs.recommended,
        files: ["**/*.json", "**/*.jsonc", "**/*.json5"]
    },
    
    // 4. Configuración para archivos Markdown (.md)
    {
        ...markdown.configs.recommended,
        files: ["**/*.md"]
    }
];
