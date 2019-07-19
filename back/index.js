const express = require('express');

const db = require('./models');

const app = express();
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(8080, () => {
    console.log('Server is running on localhost:8080');
})

