$(".edit-button").on("click", function () {
    $(".textId").html("");
    $(".textId").append(
        '<input id="userInput2" type="number" placeholder="Amount" value="" />'
    );
})

$('.submit-button').on('click', function () {
   var moneyInformation = $('#userInput2').val().trim();
   $(".textId").html("$" + moneyInformation);

})

$('.datepicker').datepicker();

