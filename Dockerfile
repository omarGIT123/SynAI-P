# Use official Node.js image as base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the application files into the container
COPY package*.json ./
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the application port (e.g., 3000)
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
