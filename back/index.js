const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const cors = require('cors');

const app = express();
db.sequelize.sync();

app.use('/', morgan('dev'));

app.use('/', bodyParser.json());
app.use('/', bodyParser.urlencoded({ extended: true }));
app.use('/', cors());

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(8080, () => {
    console.log('Server is running on localhost:8080');
})

