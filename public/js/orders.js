$(document).ready(function() {
    var orderList = $("tbody");
    var orderContainer = $(".order-container");

    getOrders()

    function getOrders() {
        $.get("/api/orders", function(data) {
          var rowsToAdd = [];
          for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createOrderRow(data[i]));
          }
          renderOrderList(rowsToAdd);
        }).then(function() {
          var table = $('#orderTable').DataTable( {
            lengthChange: false,
            buttons: [ 'copy', 'excel', 'pdf', 'colvis' ]
        } );
        
     
        table.buttons().container()
            .insertBefore( '#orderTable_filter' );
        });
      }
    function createOrderRow(data) {
        var newTr = $("<tr role='row'>");
        newTr.data("order", data);
        newTr.append("<td><a class='orderLink' data-id='"+data.id+"' href=/this-order>" + data.id + "</a></td>");
        newTr.append("<td>" + data.type + "</td>");
        newTr.append("<td>$" + data.discount + "</td>");
        newTr.append("<td>$" + data.subtotal + "</td>");
        newTr.append("<td>$" + data.tax + "</td>");
        newTr.append("<td>$" + data.tip + "</td>");
        newTr.append("<td>$" + data.total_due + "</td>");
        newTr.append("<td>" + data.payment_type + "</td>");
        newTr.append("<td>" + data.notes + "</td>");
        var date = data.created_at;
        date = date.substring(0, 10);
        newTr.append("<td>" + date + "</td>");
        newTr.append("<td><a class='customerLink' data-id='"+data.user_id+"' href=/this-customer>" + data.user_id + "</a></td>");
        return newTr;
      }


    function renderOrderList(rows) {
        orderList.children().not(":last").remove();
        orderContainer.children(".alert").remove();
        orderList.prepend(rows);  
      }

      $(document).on('click', '.orderLink', function() {
        localStorage.setItem('thisOrderId', $(this).attr('data-id'));
    })
      $(document).on('click', '.customerLink', function() {
        localStorage.setItem('thisCustomerId', $(this).attr('data-id'));
    })
})
