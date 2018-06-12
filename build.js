'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('node-yaml');
const pug = require('pug');
const sass = require('node-sass');
const Promise = require('bluebird');

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'dist';

// site configuration
const pages = {
  home: {
    template: 'index',
    filename: 'index.html'
  },
  onboard: {
    template: 'onboard',
    filename: 'i-want-to-run-a-jsconf.html'
  },
  coc: {
    template: 'coc',
    filename: 'codeofconduct.html'
  }
};

buildSite();

function loadEvents() {
  const jsconf = yaml.readSync(path.resolve(__dirname, 'conferences/jsconf.yaml')) || [];
  const family = yaml.readSync(path.resolve(__dirname, 'conferences/family.yaml')) || [];

  return {
    jsconf: jsconf.map(cleanup),
    family: family.map(cleanup)
  };

  function cleanup(item) {
    const id = Object.keys(item)[0];
    let conf = Object.assign({}, item[id]);
    conf.id = id;

    // status can be a string or list item(s) with dates
    if (!!conf.status) {
      if (conf.status instanceof Array) {
        let status = null;
        conf.status.forEach((stat) => {
          let c = Object.keys(stat)[0];
          let s = stat[c];

          let start = !!s.start ? new Date(s.start) : null;
          let end = !!s.end ? new Date(s.end) : null;

          // if only end is defined, assume yesterday as start time
          if (end !== null && start === null) {
            let dt = new Date();
            dt.setDate(dt.getDate() - 1);
            start = dt;
          }

          // if we are betwen start and end, this status is valid
          let now = Date.now();
          if (start <= now && now <= end) {
            conf.status = c;
          }
        });
      }

      // clear out any status that isn't a string
      if (typeof conf.status !== 'string') {
        conf.status = null;
      }
      console.log(conf);
    }
    return conf;
  }
}

async function buildSite() {
  try {
    const start = +(new Date);
    await buildCSS();
    await buildHTML();
    const end = +(new Date);
    console.info(`[DONE] Site successfully built in ${end - start} ms`);
  } catch (err) {
    console.error(err);
  }
}

async function buildHTML() {
  console.info(`[HTML] Building pages`);
  const conferences = loadEvents();

  return Promise.all([
    buildFile(pages.home, { conferences }),
    buildFile(pages.onboard),
    buildFile(pages.coc)
  ]);

  function buildFile(page, props) {
    return new Promise((resolve, reject) => {
      const render = pug.compileFile(path.resolve(__dirname, `templates/${page.template}.pug`), {pretty:true});
      const html = render(props);
      fs.writeFile(path.resolve(__dirname, OUTPUT_DIR, page.filename), html, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

async function buildCSS() {
  console.info(`[SASS] Building styles`);

  const source = path.resolve(__dirname, 'sass/main.scss');
  const output = path.resolve(__dirname, OUTPUT_DIR, 'css/main.css');

  return new Promise((resolve, reject) => {
    sass.render({
      file: source,
      outFile: output,
      sourceMap: true,
      outputStyle: 'compact'
    }, (err, result) => {
      if (err) return reject(err);

      fs.writeFile(output, result.css, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}
