module.exports = function(app) {
   
    // GET /  Returns Landing page
    app.get("/", function(req, res) {
        console.log("Getting root");
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    // GET /  Returns Landing page
    app.get("/products", function(req, res) {
        console.log("Getting products");
        res.sendFile(path.join(__dirname, "../views/products.html"));
    });

};