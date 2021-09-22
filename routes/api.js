//this is the api that external users will use to obtain information

const express = require("express");
const Post = require("../models/post.js");
const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *  get:
 *      description: Get all posts
 *      responses:
 *          200:
 *              description: Success
 */

router.get("/posts", async (req, res) => {
  const post = await Post.find();
  res.send(post);
});

/**
 * @swagger
 * /api/posts:
 *  post:
 *      description: Add a post
 *
 *      parameters:
 *      - in: body
 *        description: Post title, description and content
 *        required: true
 *        schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             content:
 *               type: string
 *      responses:
 *          200:
 *              description: Post added succesfully
 *          400:
 *              description: Post couldn't be added
 */

router.post("/posts", async (req, res) => {
  let post = new Post({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  });

  try {
    post = await post.save();
    res.status(200).send("Post added succesfully");
  } catch (e) {
    res.status(400).send("Post couldn't be added");
  }
});

/**
 * @swagger
 * /api/posts/comment/{id}:
 *  post:
 *      description: Add a comment to a post by id
 *
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *
 *      - in: body
 *        description: Comment content
 *        required: true
 *        schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *      responses:
 *          200:
 *              description: Success
 */

 router.post("/posts/comment/:postid", async (req, res) => {
    let post = await Post.findOne({ _id: req.params.postid });
    post.comments.push({ content: req.body.content });
  
    try {
      post = await post.save();
      res.send("Comment succesfully added");
    } catch (e) {
      res.status(404).send("Sorry, comment couldn't be added");
    }
  });

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *      description: Get a post by id
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 */

router.get("/posts/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.send(post);
});

/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *      description: Delete a post by id
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Post succesfully deleted
 *          404:
 *              description: Post couldn't be found
 */

router.delete("/posts/:id", async (req, res) => {
  var mongoose = require("mongoose");
  var id = mongoose.Types.ObjectId(req.params.id);
  try {
    await Post.findByIdAndDelete({ _id: id });
    res.status(200).send("Post succesfully deleted");
  } catch (e) {
    res.status(404).send("Post couldn't be found");
  }
});

/**
 * @swagger
 * /api/posts/{id}/{commentid}:
 *  delete:
 *      description: Delete a comment by post and comment id
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentid
 *        required: true
 *        schema:
 *          type: string
 *
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Comment does not exist
 */

router.delete("/posts/:id/:commentid", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  let filteredComments = post.comments.filter(
    (comment) => comment._id != req.params.commentid
  );
  post.comments = filteredComments;
  try {
    post = await post.save();
    res.status(200).send("Comment succesfully deleted");
  } catch (e) {
    res.status(404).send("Comment doesn't exist");
  }
});



module.exports = router;
