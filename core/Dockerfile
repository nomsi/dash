FROM node:10-alpine
LABEL maintainer "Nomsy <me@nomsy.net>"

# Set working directory
WORKDIR /usr/src/dash-core

# Copy various files
COPY package.json package-lock.json ./

# Install needed dependencies
RUN apk add --update \
    && apk add --no-cache curl \
  	&& apk add --no-cache --virtual .deps git build-base g++ \
    && npm i gulp typescript -g \
    && npm i \
    && apk del .deps

# Copy bot over to the container
COPY . .

# Build
RUN gulp build

# Run
CMD ["npm", "run", "start"]
