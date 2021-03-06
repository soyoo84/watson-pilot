'use strict';
const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');
const webService = require('./src/lib/webServices')(app);
const conversation = require('./src/lib/conversation')(app);

// bundle the code
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

// optional: load environment properties from a .env file
dotenv.load({silent: true});

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/' // Same as `output.publicPath` in most cases.
}));

app.use(express.static('public/'));

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
    console.log('Watson browserify example server running at http://localhost:%s/', port);
});
