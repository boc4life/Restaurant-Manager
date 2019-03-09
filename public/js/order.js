$(document).ready(function() {
    var ordType = $('#');
    var discount = $("#");
    var subtotal = $('#');
    var tax = $('#');
    var tip = $('#');
    var totalDue = $('#');
    var pType = $('#');
    var notes = $('#');

    $(document).on("submit", "#", handleOrderFormSubmit);
  
    function handleOrderFormSubmit(event) {
      event.preventDefault(); 
      console.log('submit')
      upsertOrder({
        type: ordType.val(),
        discount: discount.val().trim(),
        subtotal: subtotal.val().trim(),
        tax: tax.val().trim(),
        tip: tip.val().trim(),
        total_due: totalDue.val().trim(),
        payment_type: pType.val(),
        notes: notes.val()
      });
    }
  
    function upsertOrder(orderData) {
      $.post("/api/orders", orderData)
    }

});