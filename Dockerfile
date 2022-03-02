FROM node:14-alpine3.15

RUN mkdir -p /app

WORKDIR /app

# COPY package*.json ./
COPY . .

RUN yarn install

# COPY . .
EXPOSE 5410

CMD ["yarn", "dev"]
