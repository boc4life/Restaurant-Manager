$(document).ready(function() {
    getCustomers()

    function getCustomers() {
        var id=localStorage.getItem('thisOrderId');
        $.get('/api/orders/'+id, function(data) {
          renderCustomer(data);
          renderOrder(data);
        });
      }
    function renderCustomer(data) {
        $('.id').html("<a class='customerLink' data-id='"+data.User.id+"' href=/this-customer>" + data.User.id + "</a>")
        $('.phone').html(data.User.phone_number);
        $('.firstname').html(data.User.first_name + " ");
        $('.lastname').html(data.User.last_name);
        $('.address').html(data.User.address);
        $('.suite').html(data.User.suite);
        $('.city').html(data.User.city);
        $('.zip').html(data.User.zip);
        $('.state').html(data.User.state);
        $('.notes').html(data.User.notes);
        $('.premium').html(data.User.premium);
        var date = data.User.created_at;
        date = date.substring(0, 10);
        $('.date').html(date);
      }
    function renderOrder(data) {
        $('.orderNum').html(data.id);
        $('.ordType').html(data.type)
        var date = data.created_at;
        date = date.substring(0, 10);
        $('.ordDate').html(date);
        var newTr = $("<tr>");
        newTr.data("order", data);
        newTr.append("<td>" + data.discount + "</td>");
        newTr.append("<td>" + data.subtotal + "</td>");
        newTr.append("<td>" + data.tax + "</td>");
        newTr.append("<td>" + data.tip + "</td>");
        newTr.append("<td>$" + data.total_due + "</td>");
        newTr.append("<td>" + data.payment_type + "</td>");
        $('tbody').append(newTr)

        for (let i = 0; i < data.Pizzas.length; i++) {
            let newPizza = $('<div style="font-weight:600">');
            newPizza.attr("data-pizza", i);
            newPizza.append('&nbsp;&nbsp; Pizza #'+parseInt(i+1)+':');
            $(".orderBody").append(newPizza);
            let pizzaID = data.Pizzas[i].id
            $.get("/api/pizzas/" + pizzaID, function (toppings){
                for (let j = 0; j < toppings.Ingredients.length; j++) {
                    $("div[data-pizza='" + i + "'").append('</br>' +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-' + toppings.Ingredients[j].name)
                }
            })
        }
    }
    
    $(document).on('click', '.customerLink', function() {
        localStorage.setItem('thisCustomerId', $(this).attr('data-id'));
    })
})


