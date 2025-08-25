# Vue 3 Weather Forecast SPA

A modern, responsive Single Page Application built with Vue 3 and TypeScript that provides real-time weather forecasts.

**Live Demo:** [https://vofronte.github.io/vue-3-weather-forecast/](https://vofronte.github.io/vue-3-weather-forecast/)

<img width="1647" height="864" alt="image" src="https://github.com/user-attachments/assets/ae46b2b6-4ad5-4390-846f-eeffeca12485" />

[![Build and Deploy](https://github.com/vofronte/vue-3-weather-forecast/actions/workflows/deploy.yml/badge.svg)](https://github.com/vofronte/vue-3-weather-forecast/actions/workflows/deploy.yml)

## 🚀 Features

*   **City Search:** Find any city worldwide with a fast, debounced search and autocompletion.
*   **Current Weather:** Get up-to-the-minute details on temperature, humidity, wind speed, and weather conditions.
*   **Hourly Forecast:** A detailed 24-hour forecast with temperature, conditions, and wind.
*   **Weekly Forecast:** A 7-day weather outlook showing max/min temperatures and weather codes.
*   **Responsive Design:** A clean, mobile-first interface that looks great on any device.
*   **Robust State Handling:** Seamless user experience with skeleton loaders for loading states and clear error messages.

## 🛠️ Tech Stack & Tools

*   **Framework:** [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [UnoCSS](https://unocss.dev/) (Utility-First CSS Framework) with the `presetWind4` preset.
*   **APIs:**
    *   [Open-Meteo Weather API](https://open-meteo.com/en/docs) for weather data.
    *   [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for city search.
*   **Code Quality & Tooling:**
    *   **Linter:** ESLint with `@antfu/eslint-config`.
    *   **Commit Style:** [Conventional Commits](https://www.conventionalcommits.org/).
    *   **Git Hooks:** Husky, lint-staged, and commitlint for enforcing code standards.
*   **Architecture:** Adapted [Feature-Sliced Design (FSD)](https://feature-sliced.design/).
*   **Testing:** [Vitest](https://vitest.dev/) for fast and reliable unit tests.
*   **CI/CD:** [GitHub Actions](https://github.com/features/actions) for automated builds and deployment to GitHub Pages.

## 📦 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vofronte/vue-3-weather-forecast.git
    cd vue-3-weather-forecast
    ```

2.  **Install `pnpm`** (if you don't have it):
    ```bash
    npm install -g pnpm
    ```

3.  **Install dependencies:**
    ```bash
    pnpm install
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

*   `pnpm dev`: Starts the development server.
*   `pnpm build`: Builds the app for production.
*   `pnpm preview`: Serves the production build locally.
*   `pnpm test`: Runs unit tests with Vitest.
*   `pnpm commit`: Launches Commitizen for guided, conventional commits.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
