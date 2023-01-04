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

  // console.log("Date", date);

  return {
    date: date.getDate(),
    month: parseInt(date.getMonth()) == 0 ? 12 : date.getMonth(),
    year: date.getFullYear(),
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
    var dateNow = new Date();
    
    // console.log(dateNow.getDate()); 

    const handleWorksToday = new Promise((resolve, reject) => {
      const Query = Work.where({
        date: dateNow.getDate(),
      })
      // .where({
      //   month: [getTimeNow(0).month, getTimeNow(1).month, getTimeNow(-1).month],
      // });

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
      Work.find({ delete: false })
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
    console.log("USER: ", currentUser);
    Promise.all([handleWorksToday, handleWorksAll]).then((result) => {
      {
        if (result.length == 2 && result[0] && result[1]) {
          const work_today = result[0];
          const work = result[1];

          res.render("home", {
            titlePage: "Home page",
            css: [`home.css`],
            work,
            work_today,
            user: currentUser,
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
