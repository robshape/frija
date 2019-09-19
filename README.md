# Frija &middot; ![Continuous Integration](https://github.com/robshape/frija/workflows/Continuous%20Integration/badge.svg) [![License](https://img.shields.io/github/license/robshape/frija.svg)](./LICENSE)
The Swedish general election and Riksdag on the Ethereum blockchain.

## Development
The following section will help you set up your development environment.

### Prerequisites
Install [Homebrew](https://brew.sh/) and run `brew install node`. Clone this repository.

### Install Dependencies & Setup Project
Run `npm run setup` inside the root directory.

### Start Project
Run `npm start` inside the root directory. Then complete the following steps:
1. Visit [https://localhost:3000/health/](https://localhost:3000/health/) using Google Chrome.
2. Accept the self-signed SSL certificate (created by `npm run setup`).
3. Visit [http://localhost:8080/](http://localhost:8080/) using Google Chrome.
4. Use a [personal identity number](./docs/CREDENTIALS.md) to log in.

## License
[GNU General Public License v3.0](./LICENSE). Copyright (C) 2018 Frija contributors.
