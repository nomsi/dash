FROM node:10-alpine
LABEL maintainer "Nomsy <me@nomsy.net>"

# Set working directory
WORKDIR /usr/src/web

# Copy various files
COPY package.json package-lock.json ./

# Install needed dependencies
RUN apk update && apk add git

# Copy everything else over
COPY . .

# Build and run
RUN npm run build
CMD npm run start

# Expose container port to the host
EXPOSE 4679:3000