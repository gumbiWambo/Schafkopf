FROM node:16-alpine3.12
EXPOSE 1337
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]