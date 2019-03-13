$.get("/api/inventorycheck", function(data){
    console.log(data)
    for (let i = 0; i< data.length; i++) {
        if (data[i].stock_quantity <= 0) {
            $(".topping-label[data-id='" + i + "'").css("background-color", "rgba(221, 23, 23)");
        }
    }
})

// We start on pizzaNum 0 and increment in the pizzaForm submit function.
let pizzaNum = 0;
// This is the order object that gets sent in the post request on checkout. It's currently initialized for some default values that should be made dynamic in the finished product.
let order = {
    user_id: localStorage.getItem("customerId"),
    pizzas: 0,
    type: "Pickup",
    discount: 0,
    subtotal: 0,
    tip: 0,
    payment_type: "Cash",
    notes: ""
}

// Add pizza function that triggers after clicking bottom submit button.
$("#pizzaForm").submit(function(event){
    event.preventDefault();
    var ingArr = [];
    var price = 10

    // meatAdd and vegAdd compute the surplus cost of toppings. $2 for meats and $1 for vegetables. They are then added to the base price of $10
    var meatAdd = $('input[name="meatTopping"]:checked').length * 2;
    var vegAdd = $('input[name="vegTopping"]:checked').length;
    price += parseInt(meatAdd)
    price += parseInt(vegAdd)

    // The following 2 loops create display variables for meats and veggies. The loop below populates ingArr with data values for the toppings.
    var meats = ""
    $("input[name='meatTopping']:checked").each(function(){
        meats += $(this).val() + " "
    });
    var veggies = ""
    $("input[name='vegTopping']:checked").each(function(){
        veggies += $(this).val() + " "
    });
    $("input[type='checkbox']:checked").each(function(){
        ingArr.push($(this).attr("data-id"))
    });

    // Appending pizza information to order object and update current costs of order.
    order["pizza" + pizzaNum + "ingredients"] = ingArr
    order["meats" + pizzaNum] = meats;
    order["veggies" + pizzaNum] = veggies;
    order["price" + pizzaNum] = price;
    order.subtotal += parseInt(price)
    order.tax = parseFloat(order.subtotal * .06).toFixed(2)
    order.total_due = parseInt(order.subtotal) + parseFloat(order.tax);
    order.total_due.toFixed(2);

    order.pizzas += 1;
    console.log(order)
    
    $("#cart").append("<strong>Pizza " + parseInt(pizzaNum+1) + ":</strong> " + order["meats" + pizzaNum] + " " + order["veggies" + pizzaNum] + "<br>Price: " + order["price" + pizzaNum] + "<br>")
    $("#subtotalSpan").html(order.subtotal);
    $("#taxSpan").html(order.tax);
    $("#totalSpan").html(order.total_due)
    pizzaNum++
})

// "Checkout" function triggered when clicking submit button on top of page.
$("#orderSubmit").submit(function(event){
    event.preventDefault();
    localStorage.removeItem('customerId');
    var orderType = $("#orderType").val();
    var paymentType = $("#paymentType").val();
    order.type = orderType;
    order.payment_type = paymentType

    $('.customerDiv').empty()
    $.ajax("/api/orders", {
        type: "POST",
        data: order
    }).then(function(response){
        window.location = response
    })
})