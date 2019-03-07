var db = require("../models");

module.exports = function(app) {

app.get("/api/toppings", function(req, res){
    db.PizzaToppings.findAll({attributes: ["ingredient_id"]}).then(function(data){
        let arr = [];
        for (let i = 0; i < data.length; i++){
        arr.push(data[i].dataValues.ingredient_id);
            if (i == (data.length - 1)) {
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
};