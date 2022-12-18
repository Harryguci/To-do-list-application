const Work = require("../models/Work");

class deleteController {
  // [GET] /delete
  show = (req, res, next) => {
    try {
      Work.find({ delete: "true" }).then((arr) => {
        arr = Array.from(arr);
        arr = arr.map((doc) => (doc = doc.toObject()));
        res.render("delete", {
          title: "Trash Bin",
          css: `<link rel="stylesheet" href="../css/edit.css" />`,
          work: arr,
        });
        // something...
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] /delete/:id
  deleteById = (req, res, next) => {
    try {
      var id = req.params.id;
      Work.findOneAndUpdate({ _id: id }, { delete: "true" }, { new: true })
        .then((work) => {
          res.json(work);
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  undoBin = (req, res, next) => {
    try {
      var id = req.params.id;
      Work.findOneAndUpdate({ _id: id }, { delete: "false" }, { new: true })
        .then((work) => {
          res.redirect("/delete");
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  removeBin = (req, res, next) => {
    try {
      var id = req.params.id;
      Work.findOneAndDelete({ _id: id })
        .then(() => res.redirect("/"))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new deleteController();
