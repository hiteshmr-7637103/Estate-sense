FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Vite's default dev port
EXPOSE 5173

# We use --host to allow the container to talk to your machine
CMD ["npm", "run", "dev", "--", "--host"]