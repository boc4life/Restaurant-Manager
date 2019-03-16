$(document).ready(function() {
      var id=localStorage.getItem('customerId')
      if(id==null){console.log('you need to pick a customer')}
      else{
          $.get("/api/users/id/"+id, function(data) {
            var rowsToAdd = []
            rowsToAdd.push(createCustomerRow(data))
            $('.customerDiv').prepend(rowsToAdd)
          })
      }
  })

  function createCustomerRow(data) {
    var newTb = $('<table class="text-center text-dark" style="width:100%; background-color:wheat">')
    var headTr = $('<thead>')
    headTr.append("<td>ID</td>");
    headTr.append("<td>Phone #</td>");
    headTr.append("<td>Firstname</td>");
    headTr.append("<td>Lastname</td>");
    headTr.append("<td>Address</td>");
    headTr.append("<td>Suite#</td>");
    headTr.append("<td>City</td>");
    headTr.append("<td>State</td>");
    headTr.append("<td>Zip code</td>");
    headTr.append("<td>Notes</td>");
    headTr.append("<td>Premium</td>");
    headTr.append("<td>Creation date</td>");
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
    newTb.append(headTr)
    newTb.append(newTr)
    return newTb
    
}
