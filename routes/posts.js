//this is for using the website. the functionality is the same as the api
//but it has difference responses to make the website experience better
//such as redirects and renders

const express = require("express");
const Post = require("../models/post.js");
const router = express.Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const app = express();


router.get("/", async (req, res) => {
    const post = await Post.find();
    res.send(post);
  });

router.post("/", async (req, res) => {
    console.log(req.body);
  
    let post = new Post({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
    });
  
    try {
      post = await post.save();
      res.status(400).redirect("/");
    } catch (e) {
      res.render("posts/new", { post: post });
    }
  });

router.get("/new", (req, res) => {
  res.render("posts/new", { post: new Post() });
});

router.get("/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (post == null) res.redirect("/");
  res.render("posts/show", { post: post });
});


router.post("/:id", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  post.comments.push({ content: req.body.comment });

  post = await post.save();
  res.redirect("/");
});

router.delete("/:postid/:commentid", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.postid });

  let filteredComments = post.comments.filter(
    (comment) => comment._id != req.params.commentid
  );

  post.comments = filteredComments;
  post = await post.save();
  res.redirect("/");
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
