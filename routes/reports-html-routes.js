let path = require("path")

module.exports = function(app) {
    app.get("/topping-report", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "toppingReport.html"));
    });

    app.get("/dayofweek", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "dayofweek.html"));
    });

    app.get("/inventory", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "inventory.html"));
    })

    app.get("/reports", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "reports.html"));
    })

    app.get("/sales-report", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "salesReports.html"));
    })

    app.get("/customer-report", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "customersReport.html"));
    })

    app.get("/ordertype", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "orderType.html"))
    })

    app.get("/order-lookup", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/html/reports", "orderLookup.html"));
    })
}