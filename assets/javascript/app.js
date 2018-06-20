
$(document).ready(function () {
    $("#startPage").show();
    $("#formPage").hide();
	$("#resultsPage").hide();
    $("#savingsPage").hide();
    $("#suggestionPage").hide();


	// window.scrollTo(0, 500);

	$("#startButton").on("click", function () {
        $("#startPage").hide();
        $("#formPage").show();
	    $("#resultsPage").hide();
        $("#savingsPage").hide();
        $("#suggestionPage").hide();		
	})

    $("#submitForm").on("click", function (){
        $("#startPage").hide();
        $("#formPage").hide();
	    $("#resultsPage").show();
        $("#savingsPage").hide();
        $("#suggestionPage").hide();
    })

    $("#resultsButton").on("click", function (){
        $("#startPage").hide();
        $("#formPage").hide();
	    $("#resultsPage").hide();
        $("#savingsPage").show();
        $("#suggestionPage").hide();
    })

    $("#nextButton").on("click", function (){
        $("#startPage").hide();
        $("#formPage").hide();
	    $("#resultsPage").hide();
        $("#savingsPage").hide();
        $("#suggestionPage").show();
    })
})