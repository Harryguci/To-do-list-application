const Work = require("../models/Work");

class createController {
  // [GET] /create
  show = function (req, res, next) {
    res.render("create", {
      css: `<link rel="stylesheet" href="./css/create.css">`,
      title: "Create page",
    });
  };

  // [POST] /create/new
  create = function (req, res, next) {
    try {
      const work = new Work(req.body, Work);
      work.save();
      res.json(work.toObject());
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new createController();
