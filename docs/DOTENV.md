# .env

The following section will help you set up your environment variables.

## Environment Variables

|VARIABLE|VALUE|
|--------|-----|
|GRAPHQL_PORT|GraphQL server listening port.|
|GRAPHQL_URL|Full URL to the server `/graphql` endpoint.|
|SSL_CERT|Path to the SSL certificate used for HTTPS (created by `npm run setup`).|
|SSL_KEY|Path to the SSL key used for HTTPS (created by `npm run setup`).|
|TOKEN_SECRET|Secret used for signing authentication tokens and encrypting their payload.|
|TOKEN_TIME|Authentication tokens expiry time.|
