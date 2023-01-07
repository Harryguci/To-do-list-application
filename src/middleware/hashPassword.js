const bCrypt = require("bcrypt");

var isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
};
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = {
  isValidPassword: isValidPassword,
  createHash: createHash,
};
