var array = [];
  
    $('input[type="checkbox"]').click(function () {
        if ($('input[type="checkbox"]:checked').length > 0) {
            $('.col > div').hide();
            $('input[type="checkbox"]:checked').each(function () {
                $('.col >div[class=' + this.id + ']').show();
            });
        } else {
            $('.col > div').show();
        }
    });

    $('#myModal').on('show.bs.modal', function (e) {
        var title = $(e.relatedTarget).data('book-id');
        $("#myModalTitle").text(title);
        $("#myModalBody").text(title);
    });

    $(function () {
        $('#myModal').on('click', '#btnSave', function (e) {
            var item = {};
            var name = $('#myModalBody').text();
           
            item.name = name;
         
            array.push(item);
            localStorage.setItem("array", JSON.stringify(array));
            $('#myModal').modal('hide');
console.log("done")
        });
    });

    $('#myModal2').on('show.bs.modal', function (e) {
        var i;
        array = [];
        array = JSON.parse(localStorage.getItem("array"));
        $('#myModalBody2').empty();
        //document.getElementById('myModalBody2').innerHTML="";
        
    });

  