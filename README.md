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
npm install -D vite-plugin-tauri @tauri-apps/cli


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
/e-api
  /src          ← React app
    App.tsx
    components/
      Header.tsx
      Footer.tsx
      DBSelector.tsx
      TableSelector.tsx
      ColumnsSelector.tsx
      CodePreview.tsx
  /src-tauri    ← Rust backend
    src/main.rs
    Cargo.toml
  tauri.conf.json
  package.json
```

## Building OS-Specific Installers

### macOS Installer (PKG or DMG)

To produce a macOS package, you must build on a macOS machine or configure a macOS cross-compilation environment:

On Mac:
```bash
npm run tauri build -- --target x86_64-apple-darwin
```

The output .pkg (or .dmg if configured) will be in src-tauri/target/release/bundle/dmg/ or pkg/.

Cross-compilation (advanced):
* Install and configure osxcross.
* Set MACOS_SDK_PATH and install Xcode SDK.
* Use the same build command above.

To produce a macOS installer from Windows, use WSL with osxcross:

Enable WSL and install Ubuntu (PowerShell as Administrator):
```bash
wsl --install -d Ubuntu
```

Install build dependencies (in Ubuntu shell):
```bash
sudo apt update && sudo apt install -y \
  build-essential clang cmake curl git \
  libssl-dev libbz2-dev libzstd-dev liblzma-dev libcurl4-openssl-dev
```
Clone and build osxcross:
```bash
git clone https://github.com/tpoechtrager/osxcross.git
cd osxcross
# Place an Apple macOS SDK tarball (e.g., MacOSX11.1.sdk.tar.xz) into tarballs/
UNATTENDED=yes OSX_VERSION_MIN=10.13 ./build.sh
```
Configure the cross-compiler environment:
```bash
export OSXCROSS_ROOT=$PWD
export PATH=$OSXCROSS_ROOT/target/bin:$PATH
export MACOSX_DEPLOYMENT_TARGET=10.13
```
Build the DMG:
```bash
cd ../tauri-react-sample
npm run tauri build -- --target x86_64-apple-darwin
```
The generated .dmg will appear in:
```bash
src-tauri/target/release/bundle/dmg/
````
Note: Cross-compilation can be fragile; for best results, consider building on a native macOS host.

### Linux Installers (DEB and AppImage)

On Linux (or Windows with WSL configured for Linux targets):

Ensure packaging tools are installed:
```bash
sudo apt install -y dpkg-dev binutils appimagetool
```
Build DEB:
```bash
npm run tauri build -- --target x86_64-unknown-linux-gnu -- --target deb
```
Find the .deb in src-tauri/target/release/bundle/deb/.

Build AppImage:
```bash
npm run tauri build -- --target x86_64-unknown-linux-gnu -- --target appimage
```
The .AppImage will be in src-tauri/target/release/bundle/appimage/.

Note: Windows hosts cannot natively produce macOS or Linux installers without proper cross-compilation setup. For reliable results, build on the target OS or a properly configured CI environment.
```json {
"bundle": {
"deb": {
"depends": ["libc6", "libgcc1", "libwebkit2gtk-4.0-37"],
"priority": "optional"
},
"appImage": {
"systemIntegration": true
}
}
}
```