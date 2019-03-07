var db = require("../models");

module.exports = function(app) {

app.get("/api/toppings", function(req, res){
    db.PizzaToppings.findAll({attributes: ["ingredient_id"]}).then(function(data){
        let arr = [];
        for (let i = 0; i < data.length; i++){
        arr.push(data[i].dataValues.ingredient_id);
            if (i == (data.length - 1)) {
                // Create key for each ingredient being logged. These key/value pairs must line up with the labels section of the chart in toppingreport.js
                var counts = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0};
                for (var k = 0; k < arr.length; k++) {
                var num = arr[k];
                counts[num] = counts[num] ? counts[num] + 1 : 1;
                }
                let responseArr = Object.values(counts)
                res.json(responseArr)
            }
        }
    })
})

app.get("/api/dayofweek", function(req, res){
    db.Order.findAll({
        attributes: [[db.Order.sequelize.fn("dayofweek", db.Order.sequelize.col("created_at")), "dayofweek"], "subtotal"]
    }).then(function(data){
        let arr = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
        for (let i = 0; i < data.length; i++) {
            arr[data[i].dataValues.dayofweek] = parseFloat(arr[data[i].dataValues.dayofweek]) + parseFloat(data[i].dataValues.subtotal);
            if (i == (data.length - 1)) {
                res.json(arr)
            }
        }
    })
})
};