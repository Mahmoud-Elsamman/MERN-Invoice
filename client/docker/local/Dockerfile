ARG NODE_VERSION=16-alpine3.12

FROM node:${NODE_VERSION}

ARG APP_NAME=/app

WORKDIR ${APP_NAME}

COPY package*.json ./

RUN npm install 

COPY . ${APP_NAME}

CMD [ "npm", "start" ]


