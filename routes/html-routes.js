var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  app.get("/sign-in", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signin.html"));
  });

  app.get("/order", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/lookup.html"));
  });

  app.get("/menu", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/menu.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  app.get("/test", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/temp/temporderlogic.html"));
  });
  
  app.get("/order-list", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/orders.html"));
  });

  app.get("/customer-lookup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/customer.html"));
  });

  app.get("/this-customer/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/this-customer.html"));
  });

  app.get("/this-order/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/this-order.html"));
  });
};