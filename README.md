# Frija
This project implements the Swedish general election system on the Ethereum blockchain.

## Development
The following section will help you set up the development environment.

### Prerequisites
Install [Homebrew](https://brew.sh/) and run the following shell commands:
```
brew install node
```

Clone this repository. Create a file with the name `.env` inside the root directory. Add the following variables inside the file:
```
PORT=
```

|VARIABLE|VALUE                                     |
|--------|------------------------------------------|
|PORT    |The port that the server should listen on.|

### Install Dependencies
Run `npm install` inside the root directory.

### Start Project
Run `npm start` inside the root directory. Visit `http://localhost:8080/`

## Testing
The following section will help you run the test suites.

### Lint Tests
Run `npm run test:lint` inside the root directory.

## License
Frija is licensed under the [GNU General Public License v3.0](./LICENSE)
