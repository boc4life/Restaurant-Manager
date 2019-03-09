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
        });
      }
    function createOrderRow(data) {
        var newTr = $("<tr>");
        newTr.data("order", data);
        newTr.append("<td>" + data.id + "</td>");
        newTr.append("<td>" + data.type + "</td>");
        newTr.append("<td>" + data.discount + "</td>");
        newTr.append("<td>" + data.subtotal + "</td>");
        newTr.append("<td>" + data.tax + "</td>");
        newTr.append("<td>" + data.tip + "</td>");
        newTr.append("<td>" + data.total_due + "</td>");
        newTr.append("<td>" + data.payment_type + "</td>");
        newTr.append("<td>" + data.notes + "</td>");
        newTr.append("<td>" + data.createdAt + "</td>");
        newTr.append("<td>" + data.user_id + "</td>");
        return newTr;
      }


    function renderOrderList(rows) {
        orderList.children().not(":last").remove();
        orderContainer.children(".alert").remove();
        orderList.prepend(rows);  
      }
})