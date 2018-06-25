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

{/* <input id="billDateInput" class="datepicker" placeholder="Date" value="" >
<input id="billNameInput" type="number/text" placeholder="Bill Name" value="" >
<input id="billAmountInput" type="number" placeholder="Amount" value="" > */}





