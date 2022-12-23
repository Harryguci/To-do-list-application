const Work = require("../models/Work");

class finishController {
  // [GET] /finish
  // Show all the finished works.
  show = (req, res, next) => {
    Work.find({ finished: true })
      .then((arr) => {
        arr = Array.from(arr);
        arr = arr.map((work) => (work = work.toObject()));

        res.render("finish", {
          title: "Finish Page",
          work: arr,
          css: ["finish.css"],
        });
      })
      .catch((err) => {
        next(err);
      });
  };

  // [GET] /finish/:id
  // Set finish property is true
  finishOne = async (req, res, next) => {
    var id = req.params.id;
    Work.findOneAndUpdate({ _id: id }, { finished: "true" }, { new: true })
      .then((work) => {
        res.redirect("back");
      })
      .catch((err) => next(err));
  };
}

module.exports = new finishController();
