# Node LTS.
FROM node:12.16.3-alpine
WORKDIR /app

COPY ./package-lock.json ./
COPY ./package.json ./
RUN npm ci --only=production
COPY ./src/ ./src/

USER node
EXPOSE 3000
CMD ["node", "./src/index.js"]
