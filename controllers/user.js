const User = require("../models/user");

exports.getUserBySlug = (req, res, next, slug) => {
  console.log("test");
  User.findOne({ slug }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER mail does not exists",
      });
    }
    console.log("user found", user);
    req.search = user;
    next();
  });
};

exports.getUser = (req, res) => {
  console.log(User);
  var phrase = req.body.text;
  var limit = req.body.limit ? parseInt(req.body.limit) : 10;

  console.log("phrase", phrase);
  console.log("limit", limit);

  User.find({ $text: { $search: phrase } })
    .limit(limit)
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      const urlUndefined = (user, prop) => {
        return user.map((item) => {
          const obj = Object.assign({}, item);
          obj._doc["url"] = undefined;
          return obj._doc;
        });
      };
      console.log(urlUndefined(user));
      return res.json(urlUndefined(user));
    });
};

exports.returnUser = (req, res) => {
  console.log("test");
  res.json(req.search);
};
