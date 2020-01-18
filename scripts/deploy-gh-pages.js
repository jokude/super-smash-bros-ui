const ghpages = require('gh-pages');
const webpack = require('webpack');

const build = onComplete => {
  console.log('building...');
  process.env.PUBLIC_PATH = 'https://jokude.github.io/super-smash-bros-ui/';
  const config = require('../webpack/production.config');
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err);
      return;
    }
    onComplete();
  });
};

const publish = () => {
  console.log('deploying...');
  ghpages.publish('dist', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('deployed');
    }
  });
};

const deploy = () => build(publish);

deploy();
