# estágio de compilação
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080