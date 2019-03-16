$(document).ready(function () {
    $('#orderTable').hide()
    $('#ordersTable').hide()
    $(document).on("click", "#singleOrderLookup", singleOrderLookup);
    $(document).on("click", "#dateRangeLookup", dateRangeLookup);
})
function singleOrderLookup() {
    $('#orderTable_wrapper').hide();
    $('.order-table tbody').empty();
    $('#orderTable').show()
    $('.warning').remove();
    let orderNum = $("#orderLookup").val()
    if (isNaN(orderNum)) {
        return false
    }
    else {
        $.get("/api/orders/" + orderNum, function(data) {
            if(data==null) {
              $('.order-lookup').prepend('<h4 class="warning"style="color:red; text-align:center">Sorry, there are no orders with this order number</h4>')
            }
            else{
                $('#orderTable_wrapper').show();
                var rowsToAdd = []
                rowsToAdd.push(createOrderRow(data))
                $('#orderTable tbody').append(rowsToAdd)
              }
            }).then(function() {
              var table = $('#orderTable').DataTable( {
                lengthChange: false,
                buttons: [ 'copy', 'excel', 'pdf', 'colvis' ]
            } );
            table.buttons().container()
                .insertBefore( '#orderTable_filter' );
            });
    }
}

function dateRangeLookup() {
    let startDate = $("#datepickerStart").val();
    let endDate = $("#datepickerEnd").val();
    $('#ordersTable_wrapper').hide();
    $('.orders-table tbody').empty();
    $('#ordersTable').show()
    $('.warning1').remove();

    $.ajax({
        url: "/api/orders/daterangelookup",
        method: "POST",
        data: {
            startDate: startDate,
            endDate: endDate
        }
    }).then(function(response){
        $('#ordersTable_wrapper').show();
                var rowsToAdd = []
                for (var i = 0; i < response.length; i++) {
                    rowsToAdd.push(createOrdersRow(response[i]));
                  }
                  renderOrdersList(rowsToAdd);
            }).then(function() {
              var table = $('#ordersTable').DataTable( {
                lengthChange: false,
                buttons: [ 'copy', 'excel', 'pdf', 'colvis' ]
            } );
            table.buttons().container()
                .insertBefore( '#ordersTable_filter' );
            });
}


function createOrderRow(data) {
    var newTr = $("<tr role='row'>")
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
    return newTr
}

function createOrdersRow(data) {
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


function renderOrdersList(rows) {
    $('.orders-table tbody').children().not(":last").remove();
    $('.orders-table').children(".alert").remove();
    $('.orders-table tbody').prepend(rows);  
}

$(document).on('click', '.orderLink', function() {
localStorage.setItem('thisOrderId', $(this).attr('data-id'));
})

