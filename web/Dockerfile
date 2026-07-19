FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --production=false

# Copy the rest of the application
COPY . .

# Build the Next.js application for production
RUN npm run build

EXPOSE 3000

# Run in production mode
CMD ["npm", "run", "start"]
