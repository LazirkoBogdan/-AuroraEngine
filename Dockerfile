FROM node:12-alpine as build-stage

ARG game_name
ARG api_name

RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run deploy --game=$game_name --apiname=$api_name

FROM nginx:1.19.2-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY deployment/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
