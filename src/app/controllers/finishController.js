const Work = require("../models/Work");

class finishController {
  // [GET] /finish
  // Show all the works, which had finished.
  show = (req, res, next) => {
    Work.find({ finished: true, user: req.user.username })
      .then((arr) => {
        arr = Array.from(arr);
        arr = arr.map((work) => (work = work.toObject()));

        res.render("finish", {
          titlePage: "Finish Page",
          work: arr,
          user: req.user.username,
          css: ["finish.css"],
        });
      })
      .catch((err) => {
        next(err);
      });
  };

  // [GET] /finish/:id
  // Set the finish property to true
  finishOne = async (req, res, next) => {
    var id = req.params.id;
    Work.findOneAndUpdate(
      { user: req.user.username },
      { _id: id },
      { finished: "true" },
      { new: true }
    )
      .then((work) => {
        res.redirect("back");
      })
      .catch((err) => next(err));
  };
}

module.exports = new finishController();
