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
          css: [`edit.css`],
          work: arr,
          empty: arr.length === 0,
        });
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] /delete/:id
  // Delete a document, which has id.
  deleteById = (req, res, next) => {
    try {
      var id = req.params.id;
      Work.findOneAndUpdate({ _id: id }, { delete: "true" }, { new: true })
        .then((work) => {
          // res.json(work);
          res.redirect("back");
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  // [GET] /delete/:id/undo
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

  // [GET] /delete/:id/forever
  removeBin = (req, res, next) => {
    try {
      var id = req.params.id;
      Work.findOneAndDelete({ _id: id })
        .then(() => res.redirect("back"))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  // [POST] /delete/detail
  // Delete multiple documents with a POST request, that has an id array.
  // req.body : {id: .. ..}
  deleteDetail = async (req, res, next) => {
    var ids = req.body.id;
    for (var x of ids) {
      Work.findOneAndUpdate({ _id: x }, { delete: "true" })
        .then((work) => {
          console.log("Updated " + work._id);
        })
        .catch((err) => next(err));
    }
    res.redirect("back"); // back to the previous page.
  };

  /* Delete all (delete without move to trash bin) */
  deleteAll = function (req, res, next) {
    try {
      Work.deleteMany({}, () => {
        res.json({
          Delete: "ALL",
        });
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new deleteController();
