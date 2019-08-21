# Frija &middot; [![License](https://img.shields.io/github/license/robshape/frija.svg)](./LICENSE)
The Swedish general election and Riksdag on the Ethereum blockchain.

## Development
The following section will help you set up the development environment.

### Prerequisites
Install [Homebrew](https://brew.sh/) and run `brew install node`. Clone this repository. Create a file with the name `.env` inside the root directory. Add the following variables inside the file:
```
GRAPHQL_PORT=3000
GRAPHQL_URL=https://localhost:3000/graphql
SSL_CERT=./server.crt
SSL_KEY=./server.key
TOKEN_SECRET=c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9
TOKEN_TIME=10m
```

|VARIABLE|VALUE|
|--------|-----|
|GRAPHQL_PORT|GraphQL server listening port.|
|GRAPHQL_URL|Full URL to the server `/graphql` endpoint.|
|SSL_CERT|Path to the SSL certificate used for HTTPS (created by `npm run setup`).|
|SSL_KEY|Path to the SSL key used for HTTPS (created by `npm run setup`).|
|TOKEN_SECRET|Secret used for signing authentication tokens and encrypting their payload.|
|TOKEN_TIME|Authentication tokens expiry time.|

### Install Dependencies & Setup Project
Run `npm run setup` inside the root directory.

### Start Project
Run `npm run run:ethereum` inside the root directory. This will start the Truffle development blockchain. Open another shell and run the following commands inside the root directory:
```shell
npm run build:ethereum
npm run deploy:ethereum
npm start
```

Then complete the following steps:
1. Visit [https://localhost:3000/health/](https://localhost:3000/health/) using Google Chrome.
2. Accept the self-signed SSL certificate (created by `npm run setup`).
3. Visit [http://localhost:8080/](http://localhost:8080/) using Google Chrome.
4. Use a [personal identity number](./docs/CREDENTIALS.md) to log in.

## License
[GNU General Public License v3.0](./LICENSE). Copyright (C) 2018 Frija contributors.
