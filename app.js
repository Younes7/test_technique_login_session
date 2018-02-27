const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Routes
const posts = require('./routes/posts');
const utilisateurs = require('./routes/utilisateurs');

// Connection Mongoose
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/testlogin', {
  useMongoClient: true
})
  .then(() => console.log('connecter à MongoDB...'))
  .catch(err => console.log(err));

// Post Model
require('./models/Post');
const Post = mongoose.model('posts');

// Middleware Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Middleware Body-Parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Middleware Method-Override
app.use(methodOverride('_method'));

// Route Index
app.get('/', (req, res) => {
  Post.find({})
    .sort({ date: 'desc' })
    .then(posts => {
      res.render('index', {
        posts: posts
      });
  });
});

app.use('/posts', posts);
app.use('/utilisateurs', utilisateurs);

const port = 3000;

app.listen(port, () => {
  console.log(`écoute sur le port: ${port}`);
});