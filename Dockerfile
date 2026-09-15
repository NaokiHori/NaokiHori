FROM node:alpine

WORKDIR /project
RUN npm init -y --init-type=module
RUN npm install --save-dev \
  @types/react \
  @types/react-dom \
  @vanilla-extract/vite-plugin \
  oxfmt \
  oxlint \
  typescript \
  vite

RUN npm install \
  @vanilla-extract/css \
  react \
  react-dom

WORKDIR /project/src

EXPOSE 5173

CMD ["npx", "vite", "--host"]
