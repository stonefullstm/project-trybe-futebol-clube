FROM node:16-alpine AS build
WORKDIR /app-frontend
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app-frontend/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]