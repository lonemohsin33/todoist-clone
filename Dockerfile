# Use Node.js base image for development (consider upgrading Node.js version)
FROM node:12-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli@8

# Copy the rest of the application code
COPY . .

# Expose port 4200 for the Angular development server
EXPOSE 4200

# Default command to run the Angular app in development mode
CMD ["ng", "serve", "--host", "0.0.0.0"]