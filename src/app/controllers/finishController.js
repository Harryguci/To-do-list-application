const Work = require("../models/Work");

class finishController {
  // [GET] /finish
  // Show all the finished works.
  show = (req, res, next) => {
    res.send("Finish page");
  };

  // [GET] /finish/:id
  // Set finish property is true
  finishOne = (req, res, next) => {
    // res.send("Finish : " + req.params.id);
    var currId = req.params.id;
    console.log(typeof Work);
    console.log(currId);
    Work.find({ _id: currId }, (err, work) => {
      res.json(work);
    });
    // Work.findOneAndUpdated({ _id: currId }, { finished: true }, { new: true })
    //   .then((work) => res.json(work))
    //   .catch((err) => next(err));
  };
}

module.exports = new finishController();
