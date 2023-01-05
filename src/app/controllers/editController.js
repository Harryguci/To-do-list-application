const Work = require("../models/Work");

class editController {
  // [GET] /edit

  show = async function (req, res, next) {
    var count = await new Promise((resolve, reject) => {
      Work.countDocuments({ delete: true })
        .then((count) => resolve(count))
        .catch((err) => reject(err));
    });

    Work.find({ delete: "false", user: req.user.username })
      .then((arr) => {
        arr = Array.from(arr);
        arr = arr.map((doc) => (doc = doc.toObject()));

        res.render("Edit", {
          titlePage: "Edit page",
          css: ["edit.css"],
          bin_count: count,
          user: req.user.username,
          work: arr,
        });
      })
      .catch((err) => next(err));
  };

  // [GET] /edit/:id
  /*
    BUG: Can't load static files (css, javascript).
    
  */
  editOndDocument = async (req, res, next) => {
    res.render("Edit", {
      user: req.user.username,
      titlePage: "Edit page",
      css: ["edit.css"],
    });
  };

  // [POST] /edit/detail
  // Delete multiple documents with a POST request, that has an id array.
  // req.body : {id: .. ..}
  editDetail = async (req, res, next) => {
    // res.json(req.body);
    switch (req.body.type_edit) {
      case "delete":
        var ids = Array.from(req.body.id);

        for (var x of ids) {
          await Work.findOneAndUpdate({ _id: x }, { delete: "true" })
            .then((work) => {
              console.log("Updated " + work._id);
            })
            .catch((err) => next(err));
        }
        res.redirect("back"); // back to the previous page.
        break;

      case "finish":
        // .. Route to Finish controller.
        var ids = Array.from(req.body.id);

        for (var x of ids) {
          await Work.findOneAndUpdate({ _id: x }, { finished: "true" })
            .then((work) => {
              console.log("Finished " + work._id);
            })
            .catch((err) => next(err));
        }
        res.redirect("back"); // back to the previous page.
        break;

      default:
        res.redirect("/error");
        break;
    }
  };
}

module.exports = new editController();
