var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/user-api-routes.js")(app);
require("./routes/order-api-routes.js")(app);
require("./routes/pizzas-api-routes.js")(app);
require("./routes/toppings-api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
