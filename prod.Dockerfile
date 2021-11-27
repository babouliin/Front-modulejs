FROM node:16.13.0 as build

WORKDIR /app

COPY package.json /app

RUN npm install --production

COPY . /app

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]