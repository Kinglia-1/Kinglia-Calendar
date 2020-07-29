var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
// aggregate code to use in singular file in html
//goes into source file and looks at all the imports, aggregates everything into singular js file
//attach js to html file using bundle.js

module.exports = {
  //needs to be in src directory
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        use : 'babel-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  plugins: [],
  devServer:{}
};
