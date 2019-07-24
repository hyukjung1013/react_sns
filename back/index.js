const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const morgan = require('morgan')
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use('/', morgan('dev'));

app.use('/', bodyParser.json());
app.use('/', bodyParser.urlencoded({ extended: true }));
app.use('/', cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,  // https 
    },
    name: 'rnbc'    // connect.sid -> rnbcc
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);

app.listen(8080, () => {
    console.log('Server is running on localhost:8080');
})

