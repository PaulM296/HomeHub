FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port used by Angular
EXPOSE 4200

# Run the Angular development server
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
