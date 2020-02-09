FROM node:12-alpine

ARG DB_USERNAME=ardashir
ENV DB_USERNAME ${DB_USERNAME}

ARG DB_PASSWORD=infernal47
ENV DB_PASSWORD ${DB_PASSWORD}

ARG DB_NAME=track-server-nykaq.mongodb.net
ENV DB_NAME ${DB_NAME}

ARG JWT_SECRET_KEY=asldlak++//salfkjl33
ENV JWT_SECRET_KEY ${JWT_SECRET_KEY}

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3434

CMD [ "node", "src/index.js" ]
