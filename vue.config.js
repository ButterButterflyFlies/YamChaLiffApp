

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/YamChaLiffApp/" : "/",
  chainWebpack: config => {
    // use pug
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();

    // use stylus
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
  }
};

function addStyleResource(rule) {
  const path = require('path')
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/styles/imports.styl")]
    });
}