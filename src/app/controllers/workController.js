const Work = require("../models/Work");
const path = require("path");

class WorkController {
  show = function (req, res, next) {
    try {
     
      res.render("home");
      
      // Work.find({})
      //   .then((arr) => {
      //     arr = Array.from(arr);
      //     arr = arr.map((doc) => (doc = doc.toObject()));
      //     res.json(arr);
      //   })
      //   .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  create = function (req, res, next) {
    try {
      const work = new Work(
        {
          title: "The first work",
          time: Date.now(),
          content: "Something in here...",
          createAt: Date.now(),
          updateAt: Date.now(),
          delete: false,
        },
        Work
      );

      work.save();
      res.json(work.toObject());
    } catch (err) {
      next(err);
    }
  };

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

  delete = async (req, res, next) => {
    try {
      var id = req.params.id;
      res.send("Delete : " + id);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new WorkController();
