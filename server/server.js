const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// use public folder to server static assets
app.use(express.static(publicPath));

// configure all request would server the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// start the server at port 3000
app.listen(3000, () => {
  console.log('server is up!');
});
