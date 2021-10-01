const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post.js");
mongoose.connect("mongodb://localhost/blogdb");
const methodOverride = require("method-override");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const postRouter = require("./routes/posts.js");
const apiRouter = require("./routes/api.js");
const app = express();

const port = process.env.port || 5000;

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
  console.log("test");
  const posts = await Post.find().sort({ createdAt: "desc" });  //sorts posts according to the date
  res.render("posts/index", { posts: posts });
});

app.listen(port);
app.use("/api", apiRouter);
app.use("/posts", postRouter);
