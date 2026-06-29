# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency definition files to cache layers
COPY package.json package-lock.json ./

# Install dependencies using clean install
RUN npm ci

# Copy application source code
COPY . .

# Build the production bundle
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy custom nginx configuration for SPA client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from build stage to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 internally
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
