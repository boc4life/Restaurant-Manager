$.get("/api/pendingorders", function(response){
    for (let i = 0; i < response.length; i++) {
        let newDiv = $("<div class='card orderPending'>");
        let cardBody = $("<div class='card-body'>");
        let orderType = $("<h5 class='card-title'>");
        let user = $("<h4 class='card-subtitle'>");
        let pizzas = $("<p>");
        let button = $("<button class='fulfillButton'>");
        button.attr("data-id", response[i].id);
        newDiv.attr("data-id", response[i].id);
        button.text("Order Filled")
        orderType.append(response[i].type);
        user.append(response[i].User.first_name + " " + response[i].User.last_name + "<br>" + response[i].User.phone_number);
        pizzas.append(response[i].Pizzas.length + " Pizzas<br>" + response[i].total_due);
        cardBody.append(orderType).append(user).append(pizzas).append(button);
        newDiv.append(cardBody);
        $("#pendingOrders").append(newDiv)
    }
})

$(document).on("click", ".fulfillButton", fulfillOrder)

function fulfillOrder() {
    let orderID = $(this).attr("data-id");
    let dataObj = {id: orderID}
    
    $.ajax({
        url: "/api/orderfilled",
        method: "PUT",
        data: dataObj
    }).then(function(response){
        $('div[data-id="' + orderID + '"]').remove();
    })
}