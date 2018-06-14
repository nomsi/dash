FROM node:10-alpine
LABEL maintainer "Nomsy <me@nomsy.net>"

# Set working directory
WORKDIR /usr/src/dash

# Copy various files
COPY package.json package-lock.json ./

# Install needed dependencies
RUN apk add --update \
    && apk add --no-cache curl \
  	&& apk add --no-cache --virtual .deps git build-base g++ \
  	&& apk add --no-cache --virtual .npm-deps pango pangomm-dev pangomm cairo-dev libjpeg-turbo-dev pango pixman \
    && npm i gulp typescript -g \
    && npm i \
    && apk del .deps

# Copy bot over to the container
COPY . .

# Build
RUN gulp build

# Run
CMD npm run start
