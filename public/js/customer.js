$(document).ready(function() {
    $('#customerTable').hide()
    localStorage.removeItem('customerId')
    var phoneNum = $('#phone-number');
    var firstName = $("#cus-firstName");
    var lastName = $('#cus-lastName');
    var address = $('#address');
    var suite = $('#suite');
    var city = $('#city');
    var state = $('#state');
    var zip = $('#zip');
    var notes = $('#notes');
    var premium = $('#premium');

    $(document).on("submit", "#customer-form", handleCustomerFormSubmit);
    
    function handleCustomerFormSubmit(event) {
      event.preventDefault(); 
      phoneNum = phoneNum.val()
      if (phoneNum.startsWith('1 ', 0)) {
        phoneNum = phoneNum.replace(/1 /g, "")
      }
      if (phoneNum.startsWith('+1 ', 0)) {
        phoneNum = phoneNum.replace(/\+1 /g, "")
      }
      phoneNum = phoneNum.replace(/\(/g, "");
      phoneNum = phoneNum.replace(/\)/g, "");
      phoneNum = phoneNum.replace(/\-/g, "");
      phoneNum = phoneNum.replace(/\ /g, "");
      upsertCustomer({
        phone_number: phoneNum.trim(),
        first_name: firstName.val(),
        last_name: lastName.val(),
        address: address.val(),
        suite: suite.val().trim(),
        city: city.val(),
        state: state.val().trim(),
        zip: zip.val().trim(),
        notes: notes.val(),
        premium: premium.val()
      })
    }
  
    function upsertCustomer(userData) {
      $.post("/api/users", userData).then(function(response) {
        $.get("/api/users/phone/"+response.phone_number, function(data) {
          localStorage.setItem('customerId', data.id)
          window.location.href='/menu'
        });
      })
    }

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
          rowsToAdd.push(createCustomerRow(data))
          $('tbody').append(rowsToAdd)
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
});

function createCustomerRow(data) {
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
