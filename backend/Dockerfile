# development stage
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install  

COPY . .
COPY ./migrations ./migrations
COPY ./seeders ./seeders

EXPOSE 8080
COPY scripts/wait-for-it.sh /wait-for-it.sh
COPY scripts/create-db.sh /create-db.sh
RUN apk add --no-cache bash
RUN chmod +x /wait-for-it.sh /create-db.sh

CMD [ "sh", "-c", "/wait-for-it.sh mysql:3306 -- /create-db.sh" ]
# CMD ["npm", "run", "dev"]

# production stage
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080

CMD ["npm", "start"]
