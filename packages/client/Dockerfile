# BUILD (Node LTS).
FROM node:14.15.0-alpine3.12 as builder
ENV CYPRESS_INSTALL_BINARY 0
WORKDIR /app

COPY ./package-lock.json ./
COPY ./package.json ./
RUN apk add --no-cache g++ make python3
RUN npm ci

ENV NODE_ENV production

COPY ./configs/ ./configs/
COPY ./src/ ./src/
RUN npm run build:bundle

# SERVE (nginx LTS).
FROM nginx:1.18.0-alpine

COPY --from=builder ./app/configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder ./app/dist/ /usr/share/nginx/html/

RUN touch /var/run/nginx.pid \
  && chown nginx /var/cache/nginx/ \
  && chown nginx /var/run/nginx.pid
USER nginx
EXPOSE 8080
CMD ["nginx"]
