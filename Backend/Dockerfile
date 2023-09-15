# Use the official Node.js image with version 14.20.0 as the base image
FROM node:14.20.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express.js server will listen on
EXPOSE 5000

# Start your Node.js application
CMD ["npm", "start"]
