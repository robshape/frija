require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Frija'));

app.listen(process.env.PORT);
