const ghpages = require('gh-pages');
const webpack = require('webpack');
const config = require('../webpack/production.config');

const deploy = () => {
  console.log('building...');
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err);
    }
  });

  console.log('deploying...');
  ghpages.publish('dist', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('deployed');
    }
  });
};

deploy();
