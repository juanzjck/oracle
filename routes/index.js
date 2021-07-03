const { json } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {

  db.Db.instance.getAllPosts().then(posts=>{
    console.log(posts.rows)
    res.render('index', { title: 'Tus deseos', posts:posts.rows });
  });
  
});


router.get('/post/:id', function(req, res, next) {
  const post_id=req.params.id;
  console.log(post_id)
  db.Db.instance.getPostById(post_id)
  .then(post=>{
    console.log(post[0])
    return post[0] 
  }).then(estponse=>{
    db.Db.instance.getCommentsByPostId(post_id)
      .then(comments=>{
        res.render('post', { post:estponse, comments});
      })
  })
 
});




/* POST home page. */
router.post('/post/comment/:id',function(req, res, next) {
  const post_id =req.params.id; 
  const {comment} = req.body

  db.Db.instance.getPostById(post_id)
  .then(post=>{
    return post[0]
  }).then(response=>{
    console.log('------')
    console.log(response)
    db.Db.instance.createNewCommentByIdPost(post_id,comment)
      .then(commentRes=>{
       
        return commentRes
       
      }).then(newCommentResult=>{
        
        db.Db.instance.getCommentsByPostId(post_id)
        .then(comments=>{
          if(newCommentResult.lastRowid!=null){
            res.render('post', { post:response, result:'SUCCESS',comments });
          }else{
            res.render('post', { post:response, result:'ERROR',comments });
          }
        })
     
      })
  })
});

module.exports = router;
