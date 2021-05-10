FROM node:12

WORKDIR /app

# install and cache app dependencies
COPY package.json yarn.lock ./
RUN npm install

# add app
COPY ./dist/ ./

# start app
CMD node apps/server/main.js
