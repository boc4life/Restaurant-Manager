$(document).ready(function() {
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
      console.log('submit')
      upsertCustomer({
        phone_number: phoneNum.val().trim(),
        first_name: firstName.val(),
        last_name: lastName.val(),
        address: address.val(),
        suite: suite.val().trim(),
        city: city.val(),
        state: state.val().trim(),
        zip: zip.val().trim(),
        notes: notes.val(),
        premium: premium.val()
      });
    }
  
    function upsertCustomer(userData) {
      $.post("/api/users", userData)
    }

});