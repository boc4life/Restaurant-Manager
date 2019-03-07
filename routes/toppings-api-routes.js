var db = require("../models");

module.exports = function(app) {
  app.get("/api/toppings", function(req, res) {
    db.Ingredient.findAll({
      include: [db.Pizza]
    }).then(function(dbTopping) {
      res.json(dbTopping);
    });
  });

  app.get("/api/toppings/:id", function(req, res) {
    db.Ingredient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Pizza]
    }).then(function(dbTopping) {
      res.json(dbTopping);
    });
  });

  app.post("/api/toppings", function(req, res) {
    db.Ingredient.create(req.body).then(function(dbTopping) {
      res.json(dbTopping);
    });
  });

};
