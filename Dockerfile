# NodeJS Image
FROM node:13.13.0-slim

# Create App Dir
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json into image, then install packages needed.
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Since Node binds to port 8080, we need to expose that
EXPOSE 8080

# Finally, run the image!
CMD ["node", "."]