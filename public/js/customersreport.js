$(document).ready(function() {
    var customerList = $("tbody");
    var customerContainer = $(".customer-container");

    getCustomers()

    function getCustomers() {
        $.get("/api/topcustomers", function(data) {
          var rowsToAdd = [];
          for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createCustomerRow(data[i]));
          }
          renderCustomerList(rowsToAdd);
        });
      }
    function createCustomerRow(data) {
        var newTr = $("<tr>");
        newTr.data("customer", data);
        newTr.append("<td><a class='customerLink' data-id='"+data.user_id+"' href=/this-customer>" + data.user_id + "</a></td>");
        newTr.append("<td>" + data.User.first_name + "</td>");
        newTr.append("<td>" + data.User.last_name + "</td>");
        newTr.append("<td>$" + data.total + "</td>");
        return newTr;
      }


    function renderCustomerList(rows) {
        customerList.children().not(":last").remove();
        customerContainer.children(".alert").remove();
        customerList.prepend(rows);  
      }

      $(document).on('click', '.customerLink', function() {
        localStorage.setItem('thisCustomerId', $(this).attr('data-id'));
    })
})


