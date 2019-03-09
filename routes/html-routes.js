var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/sign-in", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signin.html"));
  });

  app.get("/order", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/edashboard.html"));
  });

  app.get("/test", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/temp/temporderlogic.html"));
  });
  
  app.get("/order-lookup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/orders.html"));
  });

  app.get("/customer-lookup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/customer.html"));
  });
};
