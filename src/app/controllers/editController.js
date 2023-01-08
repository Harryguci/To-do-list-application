const Work = require("../models/Work");

class editController {
  // [GET] /edit
  show = async function (req, res, next) {
    var count = await new Promise((resolve, reject) => {
      Work.countDocuments({ delete: true, user: req.user.username })
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
    Work.findOne({ _id: req.params.id })
      .then((work) => {
        console.log(work);
        work = work.toObject();

        res.render("./editById", {
          user: req.user.username,
          titlePage: "Edit page",
          css: ["edit.css", "create.css", "editById.css"],
          work: work,
        });
      })
      .catch((err) => next(err));
  };

  // [POST] /edit/:id
  saveChangeDocument = async (req, res, next) => {
    if (req.body) {
      var newWork = req.body;
      Work.findOneAndUpdate({ _id: newWork._id }, newWork)
        .then((work) => {
          res.redirect("/?notify=Save the change successfully !");
        })
        .catch((error) => next(error));
    } else {
      res.redirect("/?notify=Something was wrong !");
    }
  };

  // [POST] /edit/detail
  // Delete multiple documents with a POST request, that has an id array.
  // req.body : {id: .. ..}
  editDetail = async (req, res, next) => {
    // res.json(req.body);

    var notify;

    switch (req.body.type_edit) {
      case "delete":
        var ids = Array.from(req.body.id);

        for (var x of ids) {
          console.log(x);

          await Work.findOneAndUpdate({ _id: x }, { delete: "true" })
            .then((work) => {
              // console.log("Updated " + work._id);
              notify = "Delete work(s) successfully";
              res.redirect("/edit?notify=" + notify);
            })
            .catch((err) => next(err));
        }
        break;

      case "finish":
        // .. Route to Finish controller.
        var ids = Array.from(req.body.id);

        for (var x of ids) {
          await Work.findOneAndUpdate({ _id: x }, { finished: "true" })
            .then((work) => {
              notify = "Set Finish properties of work(s) successfully";
              res.redirect("/edit?notify=" + notify);
            })
            .catch((err) => next(err));
        }
        break;

      default:
        res.redirect("/error");
        break;
    }
  };
}

module.exports = new editController();
