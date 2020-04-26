# Node LTS.
FROM node:12.16.2-alpine

ENV NODE_ENV production

COPY ./package-lock.json ./
COPY ./package.json ./
RUN npm ci --only=production
COPY ./src/ ./src/

USER node
EXPOSE 3000
CMD ["node", "./src/index.js"]
