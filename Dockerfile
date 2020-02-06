FROM node

# Change working directory
WORKDIR /app

# Copy source code
COPY package.json .

# Install dependencies
RUN npm install

COPY . .

# Expose API port to the outside
EXPOSE 3000

# Launch application
CMD ["npm","start"]