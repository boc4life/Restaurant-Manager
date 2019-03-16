$(document).ready(function() {
    $('#customerTable').hide()
    var customerList = $("#customersTable tbody");
    var customerContainer = $(".customer-container");

    getCustomers()

    function getCustomers() {
        $.get("/api/topcustomers", function(data) {
          var rowsToAdd = [];
          for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createCustomerRow(data[i]));
          }
          renderCustomerList(rowsToAdd);
        }).then(function() {
          var table = $('#customersTable').DataTable( {
            lengthChange: false,
            buttons: [ 'copy', 'excel', 'pdf', 'colvis' ]
        } );
        table.buttons().container()
            .insertBefore( '#customersTable_filter' );
        });;
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

    $(document).on('click', '.lookup', function() {
      $('#customerTable').show()
      $('.customer-table').empty();
      $('#placeOrder').remove();
      $('.warning').remove();
      var phoneLookup = $('#phoneLookup').val().trim();
      $.get("/api/users/phone/"+phoneLookup, function(data) {
        if(data==null) {
          $('.customer-lookup').prepend('<h4 class="warning"style="color:red; text-align:center">Sorry, no customers found with this phone number!</h4>')
        }
        else{
          var rowsToAdd = []
          rowsToAdd.push(createCustomersRow(data))
          $('#customerTable tbody').append(rowsToAdd)
          $('.button-row').append('<span id="placeOrder"><button type="submit" class="place" class="btn btn-primary mb-2">Place order</button></span>')
          localStorage.setItem('customerId', data.id)
        }
      }).then(function() {
        var table = $('#customerTable').DataTable( {
          lengthChange: false,
          buttons: [ 'copy', 'excel', 'pdf', 'colvis' ]
      } );
      table.buttons().container()
          .insertBefore( '#customerTable_filter' );
      });
    })

    $(document).on('click', '.place', function() {
      window.location.href='/menu'
      })

      function createCustomersRow(data) {
        var newTr = $("<tr role='row'>")
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
        newTr.append("<td>" + data.created_at + "</td>");
        return newTr
}

$(document).on('click', '.customerLink', function() {
  localStorage.setItem('thisCustomerId', $(this).attr('data-id'));
})
})


