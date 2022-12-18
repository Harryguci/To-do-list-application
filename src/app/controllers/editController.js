const Work = require("../models/Work");

// async function randNumber(start, end) {
//   return (await Math.floor(Math.random() * end)) + start;
// }

class editController {
  // [GET] /edit
  show = function (req, res, next) {
    try {
      Work.find({ delete: "false" })
        .then((arr) => {
          arr = Array.from(arr);
          arr = arr.map((doc) => (doc = doc.toObject()));
          res.render("Edit", {
            title: "Edit page",
            css: '<link rel="stylesheet" href="./css/edit.css">',
            work: arr,
          });
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new editController();
