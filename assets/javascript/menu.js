$(document).ready(function () {
    // var testnumber = numeral(1234);
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
    // google.charts.setOnLoadCallback(drawChart);

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
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    // Other Functinos

    //variables
    var userID;
    //Pages Array
    var webPages = [
        // newPage('Welcome to Hydro...???', 'This is your first time here so we will guide you through this'),
        /* page 1 */newPage('how much do you make?',
            '<form> <input type="number"> <button>Submit</button> </form>'),
        /* page 2 */newPage('Hello Header', 'And TO World'),
        /* page 3 */newPage('Hello Header', 'And TO World'),
        /* page 4 */newPage('Hello Header', 'And TO World'),
        /* page etc. */newPage('Hello Header', 'And TO World'),
        newPage('Hello Header', 'And TO World')
    ];
    var currentPage;

    //Pages
    function newPage(header, content) {
        var ret_page = {
            header: header,
            content: content,
            toNext: function () {
                var nextIndex = webPages.indexOf(this) + 1;
                //clear the page
                $("#content").empty();
                //display next page
                webPages[nextIndex].display();
            },
            toPrevious: function () {
                var prevIndex = webPages.indexOf(this) - 1;
                $("#content").empty();
                webPages[prevIndex].display();
            },
            display: function () {
                var thisIndex = webPages.indexOf(this);
                var prevExist, nextExist;
                console.log("displaying page: ", thisIndex);
                if ((webPages[thisIndex - 1])) {
                    prevExist = true;
                }
                if ((webPages[thisIndex + 1])) {
                    nextExist = true;
                }

                var thisPage = $("#content").attr("style", 'text-align: center');
                thisPage.append('<div>' + this.header + '</div>');
                if (prevExist)
                    thisPage.append('<button id="prev-page-button"><- Previous Page</button>');

                thisPage.append(this.content);

                if (nextExist)
                    thisPage.append('<button id="next-page-button">Next Page -></button>');

                currentPage = this;
            }
        }
        return ret_page;
    }

    // $("#create-account").on("click", function(){
    //     //open a div or some kind of thing to hold a form to create a new account
    // });
    // $("#sign-in").on("click", function(){
    //     //gets data in the form and pushes it into firebase
    //     var user_name = $("#account-name").val().trim();
    //     var user_pass = $("#account-pass").val().trim();
    //     //other data that we should store
    //     // $("#account-???")
    //     // $("#account-???")
    //     database.ref().push({
    //         user_name: user_name,
    //         user_pass: user_pass,
    //         // user_name: user_name,
    //         // user_name: user_name,
    //         // user_name: user_name,
    //         // user_name: user_name,
    //     });
    // });

    $("#content").on("click", '#next-page-button', function () {
        console.log('going to next page');
        currentPage.toNext();
    }).on("click", '#prev-page-button', function () {
        console.log('going to previous page');
        currentPage.toPrevious();
    }).on("click", '.calander-day', function () {
        //show a list of things to do
    });

    //on startup
    //check if this is the users first time
    if (!localStorage.getItem('this-user-key')) {
        //assign user a new ID and save it to localStorage
        userID = database.ref('users').push({
            salary: '100'
        }).key;
        localStorage.setItem('this-user-key', userID);
        console.log(userID);

        //neat slide show
        webPages[0].display();

        //afterwards set first-time to false
        // localStorage.setItem('first-time', false);
    } else {
        //goto main page
        console.log(localStorage.getItem('this-user-key'));
        // webPages[4].display();
    }

});