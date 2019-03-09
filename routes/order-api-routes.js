var db = require("../models");

module.exports = function(app) {
  app.get("/api/orders", function(req, res) {
    db.Order.findAll({
      include: [db.User]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.get("/api/orders/:id", function(req, res) {
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.post("/api/orders", function(req, res) {
    var request = req.body
    db.Order.create({
      type: req.body.type,
      user_id: req.body.user_id,
      discount: req.body.discount,
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      tip: req.body.tip,
      total_due: req.body.total_due,
      payment_type: req.body.payment_type,
      notes: req.body.notes
    }).then(function(response){
      let orderID = response.dataValues.id
      for (let i = 0; i < req.body.pizzas; i++){
        let newPizza = {
          order_id: orderID,
          price: request["price" + i]
        }
        db.Pizza.create(newPizza).then(function(pizzaResponse){
            pizzaResponse.setIngredients(request["pizza" + i + "ingredients"]);
            db.Ingredient.decrement("stock_quantity", {
              where: {
                id: [request["pizza" + i + "ingredients"], 9, 10, 11]
              }
            })
        })
      } 
    })
  });
};