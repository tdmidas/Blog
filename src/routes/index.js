const newsRouter = require("./news.js");
const siteRouter = require("./site.js");
const authRouter = require("./auth.js");

function route(app) {
  app.use(authRouter);
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
}

module.exports = route;
