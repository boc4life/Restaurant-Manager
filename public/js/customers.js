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
        newTr.append("<td><a class='customerLink' data-id='"+data.id+"' href=/this-customer>" + data.id + "</a></td>");
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
        var date = data.created_at;
        date = date.substring(0, 10);
        newTr.append("<td>" + date + "</td>");
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


