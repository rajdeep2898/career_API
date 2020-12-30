const User = require("../models/user");
// const { Order } = require("../models/order");

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
  //   User.find().exec((err, products) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "NO product found",
  //       });
  //     }
  //     res.json(products);
  //   });

  console.log(User);
  var phrase = req.body.text;
  var limit = req.body.limit ? parseInt(req.body.limit) : 10;

  console.log("phrase", phrase);
  console.log("limit", limit);

  User.find({ $text: { $search: phrase } })
    .limit(limit)
    .exec((err, user) => {
      //   console.log("user", user);

      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      // req.profile = user;
      // user.forEach((val, idx) => {

      // })
      //   console.log("user", user);

      //   user.forEach((task) => {
      //     const obj = Object.assign({}, task);
      //     obj["url"] = undefined;
      //   });
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
  //   req.profile.salt = undefined;
  //   req.profile.encry_password = undefined;
  //   req.profile.createdAt = undefined;
  //   req.profile.updatedAt = undefined;

  //   return res.json(req.profile);
};

exports.returnUser = (req, res) => {
  console.log("test");
  res.json(req.search);
};
