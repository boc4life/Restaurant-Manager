let ctx = "myChart";
let graphData;

$.get("/api/inventory", function(data){
    graphData = data.map(a => a.stock_quantity);
}).then(function(){
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Pepperoni", "Sausage", "Chicken", "Bacon", "Onion", "Peppers", "Mushroom", "Pineapple", "Cheese", "Dough", "Sauce"],
            datasets: [{
                label: 'Inventory Units Remaining',
                data: graphData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(40, 91, 200, 0.2)',
                    'rgba(205, 33, 57, 0.2)',
                    'rgba(132, 65, 88, 0.2)',
                    'rgba(100, 160, 90, 0.2)',
                    'rgba(60, 180, 95, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(40, 91, 200, 1)',
                    'rgba(205, 33, 57, 1)',
                    'rgba(132, 65, 88, 1)',
                    'rgba(100, 160, 90, 1)',
                    'rgba(60, 180, 95, 1)',
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

function submitForm() {
    event.preventDefault()
    let pepperoni = $("#pepperoni").val();
    let sausage = $("#sausage").val();
    let chicken = $("#chicken").val();
    let bacon = $("#bacon").val();
    let onion = $("#onion").val();
    let pepper = $("#pepper").val();
    let mushroom = $("#mushroom").val();
    let pineapple = $("#pineapple").val();
    let cheese = $("#cheese").val();
    let dough = $("#dough").val();
    let sauce = $("#sauce").val();
    pepperoni = emptyCheck(pepperoni);
    sausage = emptyCheck(sausage);
    chicken = emptyCheck(chicken);
    bacon = emptyCheck(bacon);
    onion = emptyCheck(onion);
    pepper = emptyCheck(pepper);
    mushroom = emptyCheck(mushroom);
    pineapple = emptyCheck(pineapple);
    cheese = emptyCheck(cheese);
    dough = emptyCheck(dough);
    sauce = emptyCheck(sauce);
    if (isNaN(pepperoni) == true || isNaN(sausage) == true || isNaN(chicken) == true || isNaN(bacon) == true || isNaN(onion) == true || isNaN(pepper) == true || isNaN(mushroom) == true || isNaN(pineapple) == true || isNaN(dough) == true || isNaN(cheese) == true || isNaN(sauce) == true) {
        alert("Number values only please")
    }
    let dataObj = {
        pepperoni: pepperoni,
        sausage: sausage,
        chicken: chicken,
        bacon: bacon,
        onion: onion,
        pepper: pepper,
        mushroom: mushroom,
        pineapple: pineapple,
        cheese: cheese,
        dough: dough,
        sauce: sauce
    }
    console.log(dataObj)
    $.ajax({
        url: "/api/inventory", 
        data: dataObj,
        method: "POST"
    }).then(function(response){
        location.reload()
    })
}

function emptyCheck(parameter) {
    if (parameter == "") {
        return parameter = 0
    }
    else {
        return parameter = parameter
    }
}