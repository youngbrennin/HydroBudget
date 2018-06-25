$(".monthlyEdit").on("click", function () {
    $(".textId").html("");
    $(".textId").append(
        '<input id="userinput2" type="number" placeholder="Amount" value="">'
    );
})

$('.monthlySubmit').on('click', function () {
   let moneyInformation = $('#userInput2').val().trim();
   $(".textId").html("$" + moneyInformation);

})

$('.datepicker').datepicker();





