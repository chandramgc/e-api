# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Prerequisites

* Node.js >= 14
* npm or Yarn
* Rust (with cargo)
    * Install via rustup if missing
    * After install, run source $HOME/.cargo/env to add to PATH
    * Verify with:
        ```bash
        cargo --version
        ```
* @tauri-apps/cli

## Create Tauri Project

```bash
# Scaffold a new Vite + React app
npm create vite@latest e-api -- --template react
cd e-api

# Install dependencies
npm install
npm install -D @tauri-apps/cli

# Initialize Tauri
npx tauri init --force
```

## Running & Building

### Development

Run your frontend dev server and Tauri together:
```bash
npm run tauri dev
```
Or directly with the Tauri CLI:
```bash
npx tauri dev
```
### Production Build

Bundle the app for all platforms:
```bash
npm run tauri build
```

## Directory Structure

```bash
e-api/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── src-tauri/
│   ├── Cargo.toml
│   └── src/
│       └── main.rs
├── package.json
├── vite.config.js
└── tauri.conf.json
```