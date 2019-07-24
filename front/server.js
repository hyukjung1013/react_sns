const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const dev = process.env.NODE_ENV !== 'development';

const app = next( { dev } );
const requestHandler = app.getRequestHandler();

app.prepare().then( ()=>{
    const server = express();
    server.use(morgan('dev'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded( { extended: true } ));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        }
    }));

    server.get('*', (req, res) => {
        return requestHandler(req, res);
    })

    server.listen(3030, () => {
        console.log('next+exress 3030 listening.');
    });
});

