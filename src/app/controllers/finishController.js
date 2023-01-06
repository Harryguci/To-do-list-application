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
  // Set the "finish" property to true (in "Work" Modal)
  finishOne = async (req, res, next) => {
    var id = req.params.id;
    if (id) {
      Work.findOneAndUpdate({ _id: id }, { finished: "true" }, { new: true })
        .then((work) => {
          res.redirect("back");
        })
        .catch((err) => {
          var notify = "Không tìm thấy công việc này.";
          res.redirect("/?notify=" + notify);
        });
    } else {
      var notify = "Không tìm thấy công việc này.";
      res.redirect("/?notify=" + notify);
    }
  };
}

module.exports = new finishController();
