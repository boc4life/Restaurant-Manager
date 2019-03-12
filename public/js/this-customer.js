$(document).ready(function() {
    var orderList = $("tbody");
    getCustomers();

    function getCustomers() {
        var id=localStorage.getItem('thisCustomerId');
        $.get('/api/users/id/'+id, function(data) {
          renderCustomer(data);
          renderOrders(data);
        });
      }
    function renderCustomer(data) {
        $('.id').html(data.id)
        $('.phone').html(data.phone_number);
        $('.firstname').html(data.first_name + " ");
        $('.lastname').html(data.last_name);
        $('.address').html(data.address);
        $('.suite').html(data.suite);
        $('.city').html(data.city);
        $('.zip').html(data.zip);
        $('.state').html(data.state);
        $('.notes').html(data.notes);
        $('.premium').html(data.premium);
        var date = data.created_at;
        date = date.substring(0, 10);
        $('.date').html(date);
      }
    function renderOrders(data) {
        var rowsToAdd = [];
          for (var i = 0; i < data.Orders.length; i++) {
            rowsToAdd.push(createOrderRow(data.Orders[i]));
          }
          orderList.prepend(rowsToAdd);
    }

    function createOrderRow(data) {
        console.log(data)
        var newTr = $("<tr>");
        newTr.data("order", data);
        newTr.append("<td><a class='orderLink' data-id='"+data.id+"' href=/this-order>" + data.id + "</a></td>");
        var date = data.created_at;
        date = date.substring(0, 10);
        newTr.append("<td>" + date + "</td>");
        newTr.append("<td>" + data.total_due + "</td>");
        newTr.append("<td>" + data.type + "</td>");
        newTr.append("<td>" + data.payment_type + "</td>");
        return newTr;
      }

    $(document).on('click', '.orderLink', function() {
        localStorage.setItem('thisOrderId', $(this).attr('data-id'));
    })
})


