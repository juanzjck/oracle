FROM store/oracle/database-instantclient:12.2.0.1

COPY ./wallet /wallet

WORKDIR /wallet


RUN cp Wallet_*.zip /usr/lib/oracle/21/client64/lib/network/admin/
RUN sh -c 'cd /usr/lib/oracle/21/client64/lib/network/admin/ && unzip -B Wallet_*.zip'


FROM node:12.18.2 as build


WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json


RUN npm i --save

COPY . /app

RUN node app.js

FROM nginx


expose 80