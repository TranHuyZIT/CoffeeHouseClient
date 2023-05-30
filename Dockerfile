# Use an Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm i
RUN npm install -g @angular/cli@15.1.5

# Copy the entire project
COPY . /app

# Expose the default Angular port
EXPOSE 4200

# Set the entry point to serve the Angular application
CMD ["ng", "serve"]