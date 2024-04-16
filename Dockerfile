FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Run config script
RUN chmod +x ./script/build.sh

ARG PORT
ARG WS_PORT
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_DATABASE
ARG JWT_SECRET

RUN sh script/build.sh ${PORT} ${WS_PORT} ${DB_HOST} ${DB_PORT} ${DB_USER} ${DB_PASSWORD} ${DB_DATABASE} ${JWT_SECRET}

RUN npm run build

EXPOSE 443 81

CMD ["npm", "run", "start:prod"]