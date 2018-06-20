$(document).ready(function () {
    var testnumber = numeral(1234);
    // testnumber.multiply(15);
    // console.log(testnumber.format('00:00:00'));
    // console.log(testnumber.format('0o'));
    // console.log(testnumber.format('($0.00 a)'));
    // console.log(testnumber.format('$0,0.00'));

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC3NJtyc0PlFm8cKLJfrtvszKI9JWkhBos",
        authDomain: "hydro-budget.firebaseapp.com",
        databaseURL: "https://hydro-budget.firebaseio.com",
        projectId: "hydro-budget",
        storageBucket: "",
        messagingSenderId: "1063075668526"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {
            'title': 'How Much Pizza I Ate Last Night',
            //  'width':400,
            'height': 300
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    $("#create-account").on("click", function(){
        //open a div or some kind of thing to hold a form to create a new account
    });
    $("#sign-in").on("click", function(){
        //gets data in the form and pushes it into firebase
        var user_name = $("#account-name").val().trim();
        var user_pass = $("#account-pass").val().trim();
        //other data that we should store
        // $("#account-???")
        // $("#account-???")
        database.ref().push({
            user_name: user_name,
            user_pass: user_pass,
            // user_name: user_name,
            // user_name: user_name,
            // user_name: user_name,
            // user_name: user_name,
        });
    });
});