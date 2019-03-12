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
            arr[(data[i].dataValues.dayofweek - 1)] += parseFloat(data[i].dataValues.subtotal);
            if (i == (data.length - 1)) {
                res.json(arr)
            }
        }
    })
})

app.post("/api/dayofweek", function(req, res){
    let startDate = parseStart(req.body.startDate);
    let endDate = parseEnd(req.body.endDate);
    db.Order.findAll({
        attributes: [[db.Order.sequelize.fn("dayofweek", db.Order.sequelize.col("created_at")), "dayofweek"], "subtotal"],
        where: {
            created_at: 
            {
                $between: [startDate, endDate]
            }  
        }
    }).then(function(data){
        console.log(data)
        let arr = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
        for (let i = 0; i < data.length; i++) {
            arr[(data[i].dataValues.dayofweek - 1)] += parseFloat(data[i].dataValues.subtotal);
            if (i == (data.length - 1)) {
                res.json(arr)
            }
        }
    })
})

app.get("/api/inventory", function(req, res){
    db.Ingredient.findAll({
        attributes: ["stock_quantity"]
        }).then(function(data){
        res.json(data);
    })
})

app.get("/api/topcustomers", function(req, res){
    db.Order.findAll({
        attributes: ["user_id", [db.Order.sequelize.fn("sum", db.Order.sequelize.col("subtotal")), "total"]],
        group: ["user_id"],
        order: [[db.Order.sequelize.fn("sum", db.Order.sequelize.col("subtotal")), "DESC"]],
        limit: 10,
        include: [{model: db.User, attributes: ["first_name", "last_name"]}]
    }).then(function(customers){
        res.json(customers)
    })
})
};

function parseStart(startReq) {
    let startString = startReq;
    let startDate = "";
    startDate += startString.substring(6,10)
    startDate += "/"
    startDate += startString.substring(0,2)
    startDate += "/"
    startDate += startString.substring(3,5)
    startDate += " 00:00:01"
    return startDate
}

function parseEnd(endReq) {
    let endString = endReq;
    let endDate = "";
    endDate += endString.substring(6,10)
    endDate += "/"
    endDate += endString.substring(0,2)
    endDate += "/"
    endDate += endString.substring(3,5)
    endDate += " 23:59:59";
    return endDate
}