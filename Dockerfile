FROM docker pull store/oracle/database-instantclient:12.2.0.1

FROM node:12.18.2 as build


WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json


RUN npm i --save

COPY . /app

RUN node app.js

FROM nginx


expose 80