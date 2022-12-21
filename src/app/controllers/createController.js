const Work = require("../models/Work");

class createController {
  // [GET] /create
  show = function (req, res, next) {
    res.render("create", {
      css: [`create.css`],
      title: "Create page",
    });
  };

  // [POST] /create/new
  create = async function (req, res, next) {
    const work = await new Work(req.body, Work);
    await work.save();
    res.redirect("/");
  };
}

module.exports = new createController();
