FROM node:alpine

RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

COPY --chown=node:node tools/* .
RUN npm install
