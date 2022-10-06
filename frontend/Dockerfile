FROM node:16.17.1 as build
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html