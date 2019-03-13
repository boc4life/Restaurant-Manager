let ctx = "myChart";
let graphData;
let myChart;
let labelsArr = [];
let dataArr = [];

$( function() {
    $( "#datepickerStart" ).datepicker();
    $( "#datepickerEnd" ).datepicker();
  } );

$.get("/api/ordertype", function(data){
    for (let i = 0; i < data.length; i++) {
        let arr = Object.values(data[i]);
        labelsArr.push(arr[0]);
        dataArr.push(arr[1]);
    }
}).then(function(){
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsArr,
            datasets: [{
                label: 'Sales',
                data: dataArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
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
    console.log(myChart)
})

$(document).on("click", "#loadReport", function(event){
    let startDate = $("#datepickerStart").val();
    let endDate = $("#datepickerEnd").val();
    
    $.ajax({
        url: "/api/ordertype",
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