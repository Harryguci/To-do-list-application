const Work = require("../models/Work");

class searchController {
  // [GET] /search

  show = (req, res, next) => {
    if (req.query.q) {
      return this.findByName(req, res, next);
    } else {
      res.render("./search/search", {
        titlePage: "Search",
      user: req.user.username,
      css: ["search.css"],
      });
      //   res.json({ render: "Search page" });
    }
  };

  // [GET] /search?q=....
  findByName = async (req, res, next) => {
    Work.find({})
      .then(async (arr) => {
        arr = arr
          .map((work) => (work = work.toObject()))
          .filter((work) => {
            return work.title.toLowerCase().includes(req.query.q.toLowerCase());
          });

        //        arr = arr.map((work) => (work = work.toObject()));

        res.render("./search/searchResult", {
          titlePage: "Search Results",
          css: ["search.css", "edit.css"],
          work: arr,
          textSearch: req.query.q,
        });
      })
      .catch((err) => next(err));
  };
}

module.exports = new searchController();
