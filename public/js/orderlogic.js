let pizzaNum = 1
let order = new Object()

$("#pizzaForm").submit(function(event){
    event.preventDefault();
    var price = 10
    var meatAdd = $('input[name="meatTopping"]:checked').length * 2;
    var vegAdd = $('input[name="vegTopping"]:checked').length;
    price += parseInt(meatAdd)
    price += parseInt(vegAdd)
    var meats = ""
    $("input[name='meatTopping']:checked").each(function(){
        meats += $(this).val() + " "
    });
    var veggies = ""
    $("input[name='vegTopping']:checked").each(function(){
        veggies += $(this).val() + " "
    });
    order["meats" + pizzaNum] = meats;
    order["veggies" + pizzaNum] = veggies;
    order["price" + pizzaNum] = price;
    console.log(order)
    $("#cart").prepend("Pizza " + pizzaNum + ": <br>Toppings: " + order["meats" + pizzaNum] + " " + order["veggies" + pizzaNum] + "<br>Price: " + order["price" + pizzaNum])
    pizzaNum++
})