$(document).ready(function() {
    var customerList = $("tbody");
    var customerContainer = $(".customer-container");

    getCustomers()

    function getCustomers() {
        $.get("/api/users-lookup", function(data) {
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
        newTr.append("<td>" + data.id + "</td>");
        newTr.append("<td>" + data.phone_number + "</td>");
        newTr.append("<td>" + data.first_name + "</td>");
        newTr.append("<td>" + data.last_name + "</td>");
        newTr.append("<td>" + data.address + "</td>");
        newTr.append("<td>" + data.suite + "</td>");
        newTr.append("<td>" + data.city + "</td>");
        newTr.append("<td>" + data.state + "</td>");
        newTr.append("<td>" + data.zip + "</td>");
        newTr.append("<td>" + data.notes + "</td>");
        newTr.append("<td>" + data.premium + "</td>");
        newTr.append("<td>" + data.created_at + "</td>");
        return newTr;
      }


    function renderCustomerList(rows) {
        customerList.children().not(":last").remove();
        customerContainer.children(".alert").remove();
        customerList.prepend(rows);  
      }
})


