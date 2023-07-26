FROM node:18-alpine

RUN apk add --no-cache nodejs

WORKDIR /src

COPY . .

RUN npm install

EXPOSE 2000:4000

CMD ["node", "server.js"]