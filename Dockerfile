FROM oraclelinux:7-slim

RUN  yum -y install oracle-instantclient-release-el7 && \
     yum -y install oracle-instantclient-basic oracle-instantclient-devel oracle-instantclient-sqlplus && \
     rm -rf /var/cache/yum 

RUN yum install nodejs



WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json


RUN npm i --save

COPY . /app

RUN node app.js

FROM nginx


expose 80