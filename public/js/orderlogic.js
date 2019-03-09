let pizzaNum = 0
let order = {
    user_id: 1,
    pizzas: 0,
    type: "Pickup",
    discount: 0,
    subtotal: 0,
    tip: 0,
    payment_type: "Cash",
    notes: ""
}

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
    order.subtotal += parseInt(price)
    order.tax = order.subtotal * .06
    order.total_due = parseInt(order.subtotal) + parseFloat(order.tax);

    order.pizzas += 1;
    console.log(order)
    $("#cart").prepend("Pizza " + pizzaNum + ": <br>Toppings: " + order["meats" + pizzaNum] + " " + order["veggies" + pizzaNum] + "<br>Price: " + order["price" + pizzaNum])
    pizzaNum++
})

$("#orderSubmit").submit(function(event){
    $.ajax("/api/orders", {
        type: "POST",
        data: order
    }).then(function(response){
        console.log("Order Posted")
    })
})