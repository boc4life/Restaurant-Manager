var db = require("../models");

module.exports = function(app) {

  app.get("/api/users", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.User.findAll({
      where: query,
      include: [db.Order]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users-lookup", function(req, res) {
    var query = {};
    db.User.findAll({
      where: query
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Order]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    console.log("Post")
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/users", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
