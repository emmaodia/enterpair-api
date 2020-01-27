FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Copy app source code
COPY . /app

#Expose port and start application
CMD [ "npm", "start" ]
EXPOSE 3000