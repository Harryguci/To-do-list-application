const Work = require("../models/Work");

class editController {
  // [GET] /edit

  show = async function (req, res, next) {
    var count = await new Promise((resolve, reject) => {
      Work.countDocuments({ delete: true })
        .then((count) => resolve(count))
        .catch((err) => reject(err));
    });

    Work.find({ delete: "false" })
      .then((arr) => {
        arr = Array.from(arr);
        arr = arr.map((doc) => (doc = doc.toObject()));

        res.render("Edit", {
          titlePage: "Edit page",
          css: ["edit.css"],
          bin_count: count,
          work: arr,
        });
      })
      .catch((err) => next(err));
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

  // [GET] /edit/:id
  // Edit one document.
  editOne = async (req, res, next) => {
    res.send(req.params.id);
  };
}

module.exports = new editController();
