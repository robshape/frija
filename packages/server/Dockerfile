# Node LTS.
FROM node:12.16.3-alpine
ENV NODE_ENV production
WORKDIR /app

COPY ./package-lock.json ./
COPY ./package.json ./
RUN npm ci
COPY ./src/ ./src/

USER node
EXPOSE 3000
CMD ["node", "./src/index.js"]
