FROM node:16.17.1 as builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm i
RUN npm run build

FROM node:16.17.1
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start:prod"]