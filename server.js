const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post.js");
require('dotenv').config();
mongoose.connect("mongodb://localhost/blogdb" || process.env.MONGODB_URI);
const methodOverride = require("method-override");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const postRouter = require("./routes/posts.js");
const apiRouter = require("./routes/api.js");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['server.js', './routes/api.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.get("/", async (req, res) => {
  
  try{
    console.log("try1");
    const posts = await Post.find().sort({ createdAt: "desc" });  //sorts posts according to the date
  res.render("posts/index", { posts: posts });
  console.log("try2");
  }
  catch(e){
      console.log("exception");
  }
  
});

app.listen(process.env.PORT || 5000);
app.use("/api", apiRouter);
app.use("/posts", postRouter);
