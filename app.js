const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Middleware Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Route Index
app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;

app.listen(port, () => {
  console.log(`écoute sur le port: ${port}`);
});