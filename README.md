# Blog-Project-with-Node.js

This is a blog website API project that is created by using the Express framework of Node.js.
We have two routes in our project. One is /posts and the other is /api. /posts and /api have the same functionality but /posts is for a better website experience.
While testing the API, the endpoints on the /api route should be considered.

Users can add, delete blog posts, add comments to posts and delete them. The functionalities of the API are described at http://localhost:5000/api-docs/ .

I used mongoose as my database.

The API has been documented by Swagger. 
**IMPORTANT:** To see the endpoints, go to this link: http://localhost:5000/api-docs/

Adding a request body by using swagger isn't working right now (thanks to swagger).
So if you want to test the POST methods you should use Postman and send your body as x-www-form-urlencoded or just simply go to http://localhost:5000 and use the website to add posts and comments. 
Other endpoints are working well.

To have a website experience, just go to http://localhost:5000 and interact with the website using the user interface.

Dependencies I used and why I used them:

-dompurify and jsdom: I used these to sanitize the html to prevent possible XSS attacks.

-mongoose: I used mongoose for my database.

-slugify: Used for making the url look prettier by using the title name instead of objectid.

-marked: To be able to use markdown while writing our blogpost. 

-method-override: While submitting a form we can only use GET and POST methods by default. By using this dependency we can also use PUT and DELETE.

-ejs: For our front end.

-swagger-jsdoc and swagger-ui-express: To create documentation using swagger.





