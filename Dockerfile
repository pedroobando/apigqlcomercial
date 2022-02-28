FROM node:14-bullseye

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5410

CMD ["yarn", "dev"]

