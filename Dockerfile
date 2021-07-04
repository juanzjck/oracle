FROM node:12.18.2 as build

COPY /usr/lib/oracle/21/client64/lib /usr/lib/oracle/21/client64/lib

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json


RUN npm i --save

COPY . /app

RUN node app.js

FROM nginx


expose 80