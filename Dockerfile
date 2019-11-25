FROM node:10.15-stretch AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0

WORKDIR /app

# Run updates and cleanup
RUN apt-get update && \
  apt-get install -y \
  netcat \
  git && \
  rm -rf /var/lib/apt/lists/*

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

COPY package.json package-lock.json /app/

RUN npm --production=false \
  --unsafe-perm \
  --verbose \
  install

# Build dependencies
COPY . /app/

ARG BUILD_ENV=prod
COPY .env.${BUILD_ENV} /app/.env

# Build
ENV NODE_PATH=src/
ENV NODE_ENV=production
RUN npm run build

# Deploy
FROM nginx:stable-alpine
ARG BUILD_ENV=prod
COPY --from=builder /app/build/. /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log
