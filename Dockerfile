FROM node:latest

WORKDIR /project
RUN npm init -y --init-type=module
RUN npm install --save-dev \
  prettier \
  typescript \
  typescript-eslint \
  vite \
  @vanilla-extract/vite-plugin \
  @types/react \
  @types/react-dom

RUN npm install \
  @vanilla-extract/css \
  react \
  react-dom

WORKDIR /project/src

EXPOSE 5173

CMD ["npx", "vite", "--host"]
