const Work = require("../models/Work");
const path = require("path");

/*
  Get date before/after x days from to day

  - with x = 1: tomorrow
  - with x = -1: yesterday
*/
function getTimeNow(x) {
  var date = new Date();
  date.setDate(date.getDate() + x);
  date.setMonth(parseInt(date.getMonth()) + 1);

  // console.log("Date", date.getDate() + " " + date.getMonth() + " " + date.getFullYear());

  return {
    date:
      date.getDate().toString().length === 1
        ? "0" + date.getDate().toString()
        : date.getDate().toString(),
    month:
      date.getMonth().toString().length === 1
        ? "0" + date.getMonth().toString()
        : date.getMonth().toString(),
    year: date.getFullYear().toString(),
  };
}

class WorkController {
  /* 
      1. USE two Promise:
  
      - work_today: get all works have time today.
      - work: get all works (aren't finished yet)
  
      2. Merge two Process --> Render into Home page
  */
  show = async function (req, res, next) {
    var currentDate = getTimeNow(0);

    const handleWorksToday = new Promise((resolve, reject) => {
      const Query = Work.where({ user: req.user.username })
        .where({ delete: false })
        .where({
          date: currentDate.date,
        })
        .where({
          month: currentDate.month,
        })
        .where({ year: currentDate.year });

      Query.find({})
        .sort({ date: "asc", month: "asc", year: "asc" })
        .then((arr) => {
          arr = Array.from(arr);
          arr = arr.map((doc) => (doc = doc.toObject()));
          resolve(arr);
        })
        .catch((err) => reject(err));
    });

    const handleWorksAll = new Promise((resolve, reject) => {
      Work.find({ delete: false, user: req.user.username })
        .sort({ date: "asc", month: "asc", year: "asc" })
        .then((arr) => {
          arr = Array.from(arr);
          arr = arr.map((doc) => (doc = doc.toObject()));

          resolve(arr);
        })
        .catch((err) => reject(err));
    });
    // console.log("USER: ", req.user);
    var currentUser;

    if (req.user) currentUser = req.user.username;
    Promise.all([handleWorksToday, handleWorksAll]).then((result) => {
      {
        if (result.length == 2 && result[0] && result[1]) {
          const work_today = result[0];
          const work = result[1];

          res.render("home", {
            titlePage: "Home page",
            css: [`home.css`, 'create.css'],
            javascript: [{type: 'module', file: 'home.js'}],
            work,
            work_today,
            user: currentUser,
            notify: req.query.notify,
          });
        } else {
          redirect("/error");
        }
      }
    });
  };

  // Show all documents as json objects. (For development)
  showAllJson = (req, res, next) => {
    try {
      Work.find({})
        .then((arr) => {
          arr = Array.from(arr);
          arr = arr.map((doc) => (doc = doc.toObject()));
          res.json(arr);
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  /* 
    Create a default work. (For development) 
  */
  // [GET] /creatework
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

  /* Delete the work has specific id */
  delete = async (req, res, next) => {
    try {
      var id = req.params.id;
      res.send("Delete : " + id);
    } catch (err) {
      next(err);
    }
  };

  showError = async (req, res, next) => {
    try {
      res.sendFile(
        path.join(__dirname, "..", "..", "..", "public", "html", "error.html")
      );
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new WorkController();
