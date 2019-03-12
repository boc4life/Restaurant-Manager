let ctx = "myChart";
let graphData;

$( function() {
    $( "#datepickerStart" ).datepicker();
    $( "#datepickerEnd" ).datepicker();
  } );

$.get("/api/toppings", function(data){
    graphData = data
}).then(function(){
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Pepperoni", "Sausage", "Chicken", "Bacon", "Onion", "Peppers", "Mushroom", "Pineapple"],
            datasets: [{
                label: '# of Times Ordered',
                data: graphData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(40, 91, 200, 0.2)',
                    'rgba(205, 33, 57, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(40, 91, 200, 1)',
                    'rgba(205, 33, 57, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
})

$(document).on("click", "#loadReport", function(event){
    let startDate = $("#datepickerStart").val();
    let endDate = $("#datepickerEnd").val();
    let dataObj = {};
    dataObj.startDate = startDate;
    dataObj.endDate = endDate;
    console.log(startDate, endDate, dataObj)
    
    $.ajax({
        url: "/api/toppings",
        method: "POST",
        data: {
            startDate: startDate,
            endDate: endDate
        }
    }).then(function(response){
        myChart.config.data.datasets[0].data = response;
        myChart.update();
    })
})