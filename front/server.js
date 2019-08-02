const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const favicon = require('express-favicon');
dotenv.config();

const dev = process.env.NODE_ENV !== 'development';

const app = next( { dev } );
const requestHandler = app.getRequestHandler();

app.prepare().then( ()=>{
    const server = express();
    server.use(morgan('dev'));
    server.use(favicon(__dirname + '/public/favicon.ico'));
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

    server.get('/hashtag/:tag', (req, res) => {
        return app.render(req, res, '/hashtag', { tag: req.params.tag });   // pages/hashtag.js
    });

    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', { id: req.params.id });    // pages/user.js
    })

    server.get('/post/:id', (req, res) => {
        return app.render(req, res, '/post', { id: req.params.id });    
    })

    server.get('*', (req, res) => {
        return requestHandler(req, res);
    })

    server.listen(prod ? process.env.PORT : 3030, () => {
        console.log(`next+exress ${process.env.PORT} listening.`);
    });
});

