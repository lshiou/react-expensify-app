// ref: webpack.js.org - documentation
// to run this file, can use command 'node webpack.config.js'

// need to use node built-in module 'path' for joining path
// ref: nodejs.org/api/path.html
const path = require('path');

console.log(path.join(__dirname, 'public')); //path to current location


// export a function, when called, will return the object
module.exports = (env ) => {
  const isProduction = env === 'production';
  console.log('env', env);

  return {
    // specify webpack config details

    // entry file
    entry: './src/app.js',
  //  entry: './src/playground/redux-expensify.js',  

    // output file
    output: {
      path: path.join(__dirname, 'public'), //need to use absolute path on your machine
      filename: 'bundle.js'
    },

    // setup loader
    module: {
      // rules take an array of loaders
      rules: [
      // JS loader  
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, 
      // CSS loader
      {
        // support both css and scss
        test: /\.s?css$/,   
        // 'use' allow providing more than 1 loader
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },

    // source maps
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

    devServer: {
      contentBase: path.join(__dirname, 'public'),

      //handling routing via client side code.  return index.html for all 404 routes
      historyApiFallback: true    
    }
  }
};

