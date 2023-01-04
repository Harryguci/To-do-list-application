const Work = require("../models/Work");

class createController {
  // [GET] /create
  show = function (req, res, next) {
    res.render("create", {
      css: [`create.css`],
      title: "Create page",
      user: req.user.username,
    });
  };

  // [POST] /create/new
  create = async function (req, res, next) {
    var Object = req.body;
    if (Object.date.length === 1) {
      Object.date = "0" + Object.date;
    }
    if (Object.month.length === 1) {
      Object.month = "0" + Object.month;
    }

    const work = await new Work(req.body, Work);
    await work.save();
    res.redirect("/");
  };
}

module.exports = new createController();
