# Frija &middot; [![License](https://img.shields.io/github/license/robshape/frija.svg)](./LICENSE)
The Swedish general election and Riksdag on the Ethereum blockchain.

## Development
The following section will help you set up the development environment.

### Prerequisites
Install [Homebrew](https://brew.sh/) and run `brew install node`. Clone this repository. Create a file with the name `.env` inside the root directory. Add the following variables inside the file:
```
PORT=3000
```

|VARIABLE|VALUE                                     |
|--------|------------------------------------------|
|PORT    |The port that the server should listen on.|

### Install Dependencies
Run `npm install` inside the root directory.

### Start Project
Run `npm run run:ethereum` inside the root directory. This will start the Truffle development blockchain. Open another shell and run the following commands:
```
npm run build:ethereum
npm run deploy:ethereum
npm start
```

Visit `http://localhost:8080/` using Google Chrome. Use a [personal identity number](./docs/CREDENTIALS.md) to log in.

## Testing
The following section will help you run the test suites.

### Lint
Run `npm run lint` inside the root directory.

### Test
Run `npm test` inside the root directory.

## License
[GNU General Public License v3.0](./LICENSE). Copyright (C) 2018 Frija contributors.
