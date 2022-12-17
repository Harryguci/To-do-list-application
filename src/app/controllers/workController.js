const Work = require("../models/Work");
// const path = require("path");

/*
  Get date before/after x days from to day

  - with x = 1: tomorrow
  - with x = -1: yesterday
*/
function getTimeNow(x) {
  var date = new Date();
  date.setDate(date.getDate() + x);
  return date;
}

class WorkController {
  show = function (req, res, next) {
    try {
      Work.find({ time: { $gte: getTimeNow(-1), $lte: getTimeNow(1) } })
        .then((arr) => {
          arr = Array.from(arr);
          arr = arr.map((doc) => (doc = doc.toObject()));
          //return arr;

          /* 
            1. USE two Promise:

            - work_today: get all works have time today.
            - work: get all works (aren't finished yet)

            2. Merge two Process --> Render into Home page
          */

          res.render("home", {
            css: `<link rel="stylesheet" href="./css/home.css">`,
            work_today: arr,
            work: arr,
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  /* Show all works (aren't finished yet) into Home page */
  showAll = (req, res, next) => {
    try {
      Work.find({})
        .then((arr) => {
          arr = Array.from(arr);
          arr = arr.map((doc) => (doc = doc.toObject()));
          res.render("home", {
            css: `<link rel="stylesheet" href="./css/home.css">`,
            work_today: arr,
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  /* Create a default work */
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

  /* Delete the work has specific id */
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
