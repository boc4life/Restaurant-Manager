let ctx = "myChart";
let graphData;
let myChart;
let labelsArr = [];
let dataArr = [];

$( function() {
    $( "#datepickerStart" ).datepicker();
    $( "#datepickerEnd" ).datepicker();
    $( "#timepickerStart" ).timepicker({    timeFormat: 'H:i:s',
                                            minTime: '08:00:00',
                                            maxTime: '22:30:00',
                                            'scrollDefault': 'now'
                                        });
    $( "#timepickerEnd" ).timepicker({      timeFormat: 'H:i:s',
                                            minTime: '08:00:00',
                                            maxTime: '22:30:00',
                                            'scrollDefault': 'now'
                                        });
  } );

$.get("/api/ordertype", function(data){
    for (let i = 0; i < data.length; i++) {
        let arr = Object.values(data[i]);
        labelsArr.push(arr[0]);
        dataArr.push(arr[1]);
    }
}).then(function(){
    createChart(ctx)
})

$(document).on("click", "#loadReport", function(event){
    let startDate = $("#datepickerStart").val();
    let endDate = $("#datepickerEnd").val();
    let startTime = $('#timepickerStart').val();
    let endTime = $('#timepickerEnd').val();
        $.ajax({
        url: "/api/ordertype",
        method: "POST",
        data: {
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime
        }
    }).then(function(data){
        labelsArr = [];
        dataArr = [];
        for (let i = 0; i < data.length; i++) {
            let arr = Object.values(data[i]);
            labelsArr.push(arr[0]);
            dataArr.push(arr[1]);
            if (i == (data.length - 1)){
                myChart.destroy();
                createChart(ctx)
            }
        }
    })
})

createChart = function(ctx) {
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labelsArr,
            datasets: [{
                label: 'Sales',
                data: dataArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
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
}
