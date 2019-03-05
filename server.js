var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize.sync({force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> f9bb6a75165e9a4a12cfd806dc81163174419fe2
