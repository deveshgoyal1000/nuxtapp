# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 (or whatever your app uses)
EXPOSE 3000

# Start the app
CMD ["node", ".output/server/index.mjs"]
