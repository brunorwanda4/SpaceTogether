# Stage 1: Build stage

# Use the official Node.js image as the base image
FROM node:20-alpine as builder

# Install Rust, required for building Tauri
RUN apk add --no-cache curl \
    && curl https://sh.rustup.rs -sSf | sh -s -- -y \
    && source $HOME/.cargo/env

# Install Tauri CLI
RUN npm install -g @tauri-apps/cli

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.*json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Runtime stage

# Use a lighter base image for runtime
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install Tauri dependencies
RUN apk add --no-cache libstdc++ libgcc

# Expose the port the app runs on
EXPOSE 3000

# Start the Tauri application
CMD ["npx", "tauri", "dev"]
