const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attribute: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC'], ['updatedAt', 'ASC']],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/', (req, res) => {

});

router.post('/images', (req, res) => {

});

module.exports = router;