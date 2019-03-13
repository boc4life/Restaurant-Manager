$(document).on("click", "#singleOrderLookup", singleOrderLookup);
$(document).on("click", "#dateRangeLookup", dateRangeLookup);

function singleOrderLookup() {
    let orderNum = $("#orderLookup").val()
    console.log(orderNum)
    if (isNaN(orderNum)) {
        return false
    }
    else {
        $.get("/api/orders/" + orderNum, function(data) {
            console.log(data);
        })
    }
}

function dateRangeLookup() {
    let startDate = $("#datepickerStart").val();
    let endDate = $("#datepickerEnd").val();

    $.ajax({
        url: "/api/orders/daterangelookup",
        method: "POST",
        data: {
            startDate: startDate,
            endDate: endDate
        }
    }).then(function(response){
        console.log(response)
}
    )
}