# Stage 1: Build Frontend
FROM node:18-alpine AS frontend
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Build Tauri App
FROM rust:1.70 AS builder
# Install dependencies for Tauri, OS packaging, and osxcross
RUN apt-get update && apt-get install -y \
    build-essential pkg-config libssl-dev libgtk-3-dev \
    cmake libglib2.0-dev libwebkit2gtk-4.0-dev wine mingw-w64 \
    python3 git curl clang libbz2-dev libzstd-dev liblzma-dev libcurl4-openssl-dev \
 && rm -rf /var/lib/apt/lists/*

# Setup osxcross for macOS cross-compilation
RUN git clone https://github.com/tpoechtrager/osxcross.git /osxcross
# Copy macOS SDK tarball into osxcross/tarballs (ensure your SDK tarball is in the build context)
COPY MacOSX*.sdk.tar.xz /osxcross/tarballs
RUN cd /osxcross && UNATTENDED=yes OSX_VERSION_MIN=10.13 ./build.sh
ENV OSXCROSS_ROOT=/osxcross
ENV PATH=$OSXCROSS_ROOT/target/bin:$PATH
ENV MACOSX_DEPLOYMENT_TARGET=10.13

WORKDIR /app
# Copy built frontend assets
COPY --from=frontend /app/dist ./dist
# Copy sources and config
COPY src-tauri ./src-tauri

# Install Tauri CLI
RUN cargo install tauri-cli --version 2.5.0

# Build for Linux
RUN rustup target add x86_64-unknown-linux-gnu && \
    cargo build --release --target x86_64-unknown-linux-gnu
# Build for Windows (MinGW)
RUN rustup target add x86_64-pc-windows-gnu && \
    cargo build --release --target x86_64-pc-windows-gnu
# Build for macOS (osxcross)
RUN rustup target add x86_64-apple-darwin && \
    cargo build --release --target x86_64-apple-darwin

# Stage 3: Package Artifacts
FROM alpine:latest AS dist
WORKDIR /output
# Copy Linux bundle
COPY --from=builder /app/src-tauri/target/release/bundle/deb ./linux-deb
COPY --from=builder /app/src-tauri/target/release/bundle/appimage ./linux-appimage
# Copy Windows installer (MSI) and executable (.exe)
COPY --from=builder /app/src-tauri/target/x86_64-pc-windows-gnu/release/bundle/msi ./windows-msi
COPY --from=builder /app/src-tauri/target/x86_64-pc-windows-gnu/release/bundle/exe ./windows-exe
# Copy macOS DMG
COPY --from=builder /app/src-tauri/target/x86_64-apple-darwin/release/bundle/dmg ./macos-dmg