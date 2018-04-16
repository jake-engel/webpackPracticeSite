const express = require('express');
const path = require('path');

const app = express();

// IF ADDING ROUTES MUST ADD ABOVE STUFF BELOW (SO RIGHT HERE)

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const webpackConfig = require('./webpack.config');

  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('build')); // makes the build folder public
  // below used for compatability with ReactRouter's BrowserHistory module
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  })
}

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log(`Now listening on port ${PORT || 'production'}!`));