FROM node:16.13.0

WORKDIR /app

COPY package.json /app

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . /app

EXPOSE 3000

CMD npm start