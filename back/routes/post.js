const express = require('express');
const db = require('../models');
const path = require('path');
const multer = require('multer');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');  // uploads 폴더
    },
    filename(req, file, done) {
      const external = path.extname(file.originalname);
      const basename = path.basename(file.originalname, external); // 제로초.png, external===.png, basename===제로초
      done(null, basename + new Date().valueOf() + external);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    // 폼데이터의 파일, 이미지 => req.file / req.files
    // 폼데이터의 일반 값 => req.body

    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => db.Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } }))
            );
            await newPost.addHashtags(result.map( r => r[0] ));
        }
        if (req.body.image) {
          if (Array.isArray(req.body.image)) {  
            // 이미지 여러개
            const images = await Promise.all(req.body.image.map((image) => {
              return db.Image.create({ src: image });
            }));
            await newPost.addImages(images);
          } else {
            // 이미지 1개
            const image = await db.Image.create({ src: req.body.image });
            await newPost.addImage(image);
          }
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
              model: db.User,
            }, {
              model: db.Image,
            }], 
        });
        res.json(fullPost);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/images', upload.array('image'), (req, res) => {
  // upload.none();     이미지나 파일을 하나도 올리지않을 때
  // upload.single();   파일 1개
  // upload.array();    파일 여러개
  // 파라미터는 formData에서 append()하는 이름 

  console.log(req.files);   // upload.single()이면 req.file
  res.json(req.files.map(v => v.filename));
});

router.get('/:id/comments', async (req, res, next) => {
    try {
      const post = await db.Post.findOne({ where: { id: req.params.id } });
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      const comments = await db.Comment.findAll({
        where: {
          PostId: req.params.id,
        },
        order: [['createdAt', 'ASC']],
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }],
      });
      res.json(comments);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
  
  router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /api/post/1000000/comment
    try {
      if(!req.user) {
          return res.status(401).send('로그인이 필요합니다.');
      }
      const post = await db.Post.findOne({ where: { id: req.params.id } });
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      const newComment = await db.Comment.create({
        PostId: post.id,
        UserId: req.user.id,
        content: req.body.content,
      });
      await post.addComment(newComment.id);
      const comment = await db.Comment.findOne({
        where: {
          id: newComment.id,
        },
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }],
      });
      return res.json(comment);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  });

  router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
      const post = await db.Post.findOne({ where: { id: req.params.id }});
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      await post.addLiker(req.user.id);
      res.json({ userId: req.user.id });
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
  
  router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
      const post = await db.Post.findOne({ where: { id: req.params.id }});
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      await post.removeLiker(req.user.id);
      res.json({ userId: req.user.id });
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
    try {
      const post = await db.Post.findOne({
        where: { id: req.params.id },
        include: [{
          model: db.Post,
          as: 'Retweet',
        }],
      });
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
        return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
      }
      const retweetTargetId = post.RetweetId || post.id;  // 리트윗한 게시글을 다시 리트윗 || 원본게시글 리트윗
      const exPost = await db.Post.findOne({
        where: {
          UserId: req.user.id,
          RetweetId: retweetTargetId,
        },
      });
      if (exPost) {
        return res.status(403).send('이미 리트윗했습니다.');
      }
      const retweet = await db.Post.create({
        UserId: req.user.id,
        RetweetId: retweetTargetId,
        content: 'retweet',
      });
      // 리트윗 안에 들어갈 이전 게시글
      const retweetWithPrevPost = await db.Post.findOne({
        where: { id: retweet.id },
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Post,
          as: 'Retweet',
          include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
          }, {
            model: db.Image,
          }],
        }],
      });
      res.json(retweetWithPrevPost);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
      const post = await db.Post.findOne({ where: { id: req.params.id } });
      if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
      }
      await db.Post.destroy({ where: { id: req.params.id } });
      res.send(req.params.id);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
  
  router.get('/:id', async (req, res, next) => {
    try {
      const post = await db.Post.findOne({
        where: { id: req.params.id },
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }],
      });
      res.json(post);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
  
module.exports = router;