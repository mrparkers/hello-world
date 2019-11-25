FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY server.js .

ENTRYPOINT ["node", "server.js"]
