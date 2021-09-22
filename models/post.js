const mongoose = require("mongoose"); //mongoose is used for local database in this api
const marked = require("marked"); //used for markdown
const slugify = require("slugify"); //used for making the url look better. slugs can be used instead of id's
const createDomPurify = require("dompurify"); //purifying the dom to prevent xss attacks
const { JSDOM } = require("jsdom"); //needed for purifying

const dompurify = createDomPurify(new JSDOM().window);

const postSchema = new mongoose.Schema({  //our schema for post
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      content: { type: String,  trim: true },
    },
  ],
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.content) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.content)); //we need to first markdown the content
    //by doing a markdown, we convert it to html, and then we sanitize it to take the vulnerabilities out
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
