# BUILD (Node LTS).
FROM node:12.16.2-alpine as builder
WORKDIR /frija

COPY ./package-lock.json ./
COPY ./package.json ./
RUN apk add --no-cache g++ make python
RUN npm ci

ENV NODE_ENV production

# /.github/workflows/continuous-integration.yml
# /docs/DOTENV.md
COPY ./configs/ ./configs/
COPY ./src/ ./src/
COPY ./webpack.config.prod.js ./
RUN npm run build:bundle

# SERVE (nginx LTS).
FROM nginx:1.17.10-alpine

COPY --from=builder ./frija/configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder ./frija/dist/ /usr/share/nginx/html/

RUN touch /var/run/nginx.pid \
  && chown nginx /var/cache/nginx/ \
  && chown nginx /var/run/nginx.pid
USER nginx
EXPOSE 8080
CMD ["nginx"]
