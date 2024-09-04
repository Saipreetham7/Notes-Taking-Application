# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the backend package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the backend source code
COPY . .


# Copy the built frontend files into the backend container
# Assuming the frontend build files are available in the backend build context
COPY --from=saipreetham7/note-app-frontend /usr/share/nginx/html /app/public


# Expose the port on which the backend runs
EXPOSE 8080

# Start the backend server
CMD ["node", "app.js"]
