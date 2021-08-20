$(document).ready(function() {
    $(document).on('click', '.modal-li', function() {
        $(this).closest(".modal-wrapper").removeClass("active");
        $(this).closest(".modal-wrapper").next().addClass("active");
    })
    var index;
    var data = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "mydata.json",
            'dataType': "json",
            'success': function(data) {
                json = data;
            }
        });
        return json;
    })();
    for (var i = 0; i < data.device.length; ++i) {
        $(".modal-list_name").append("<div class='modal-li modal-list-name_li' index='" + i + "'><img src='" + data.device[i].img + "' ><div class='modal-list-name_text'> " + data.device[i].name + "</div></div>");
    }
    $(document).on('click', '.modal-list-name_li', function() {
        window.data_divice = data.device[$(this).attr('index')];
        $(".modal-list_rangefinder").html("");
        for (var i = 0; i < window.data_divice.rangefinder.length; ++i) {
            $(".modal-list_rangefinder").append("<li class='modal-li modal-li_btn-2' index1='" + i + "'>" + window.data_divice.rangefinder[i].name + "</li>")
        }
    })
    $(document).on('click', '.modal-list_rangefinder > .modal-li', function() {
        window.data_rangefinder = window.data_divice.rangefinder[$(this).attr('index1')]
        $(".modal-list_correctness").html("");
        for (var i = 0; i < window.data_rangefinder.parameters.length; ++i) {
            $(".modal-list_correctness").append("<li class='modal-li modal-li_btn'  index2='" + i + "'>" + window.data_rangefinder.parameters[i].correctness + "</li>")
        }
    })
    $(document).on('click', '.modal-list_correctness > .modal-li', function() {
        $(".modal-footer").addClass("active");
        var index2 = $(this).attr('index2');
        window.data_parameters = window.data_rangefinder.parameters[$(this).attr('index2')];
        $("tbody").html("");
        $(".modal-modify").html("");
        for (var i = 0; i < window.data_divice.modify.length; ++i) {
            $(".modal-modify").append("<label><input type='checkbox' name='1' class='modal-modify_input' value='" + window.data_divice.modify[i].price + "'><div>" + window.data_divice.modify[i].name + "</div></label>");
        };
        for (var i = 0; i < window.data_parameters.equipment.length; ++i) {
            var sum = parseInt(data_parameters.equipment[i].price) * parseInt(window.data_parameters.equipment[i].count);
            $("tbody").append("<tr><td>" + window.data_parameters.equipment[i].name + "</td><td class='table-price'>" + window.data_parameters.equipment[i].price + "</td><td><input type='number' min='0' value='" + data_parameters.equipment[i].count + "' class='table-input'></td><td class='table-item-price'>" + sum + "</td></tr> ")
        };
        sum_count();
    });
    $(document).on('change', '.table-input', function() {
        var price = $(this).closest('td').prev().text();
        var value = $(this).val();
        $(this).closest('td').next().text(price * value);
        sum_count();
    });
    $(document).on('change', '.modal-modify_input', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
        sum_count();
    })

    function sum_count() {
        if (parseInt($(".modal-modify_input:checked").val()) > 0){
            var modify = parseInt($(".modal-modify_input:checked").val());
        }else{
            var modify = 0;
        };

        if ( parseInt(window.data_parameters.price) + modify > 0) {
            var sum = parseInt(window.data_parameters.price) + modify;
        }else{
            var sum = 0;
        }

        $('.table-item-price').each(function() {
            sum += parseInt($(this).text())
        })
        $('.table-sum').text("Общая сумма: " + sum);
    };
    // sum_count();
    $(".modal-table_btn").on('click', function() {
        $(".modal-wrapper-table.active").removeClass("active");
        $(".modal-wrapper-mail").addClass("active");
        $(".modal-footer").removeClass("active");
    });
});