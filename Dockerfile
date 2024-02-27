# Use an official Node.js runtime as a base image
FROM node:19

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy your application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run your seeding script
RUN npm run seed

# Command to run your application
CMD ["npm", "start"]