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
    function displayMainPage(userID){
        
    }
    //variables
    var userID;

    
    //Pages Array
    var introWebPages = [
        // newIntroPage('Welcome to Hydro...???', 'This is your first time here so we will guide you through this'),
        /* page 1 */newIntroPage('how much do you make?',
            '<form> <input type="number"> <button>Submit</button> </form>'),
        /* page 2 */newIntroPage('Hello Header', 'And TO World'),
        /* page 3 */newIntroPage('Hello Header', 'And TO World'),
        /* page 4 */newIntroPage('Hello Header', 'And TO World'),
        /* page etc. */newIntroPage('Hello Header', 'And TO World'),
        newIntroPage('Hello Header', 'And TO World')
    ];
    var currentPage;

    //Pages
    function newIntroPage(header, content) {
        var ret_page = {
            header: header,
            content: content,
            toNext: function () {
                var nextIndex = introWebPages.indexOf(this) + 1;
                //clear the page
                $("#content").empty();
                //display next page
                introWebPages[nextIndex].display();
            },
            toPrevious: function () {
                var prevIndex = introWebPages.indexOf(this) - 1;
                $("#content").empty();
                introWebPages[prevIndex].display();
            },
            display: function () {
                var thisIndex = introWebPages.indexOf(this);
                var prevExist, nextExist;
                console.log("displaying page: ", thisIndex);
                if ((introWebPages[thisIndex - 1])) {
                    prevExist = true;
                }
                if ((introWebPages[thisIndex + 1])) {
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
        //brings up a new bill to be added on a specific day
        var new_bill = {
        }
    });

    $("personal-data-form").on("click", 'submit-personal-data', function(){
        var name = $("name-data").val().trim();
        var salary = $("salary-data").val().trim();
        var timeFrame = $("salary-time-frame-data").val().trim();
        //salary is required, timeFrame should be a dropdown menu
        database.ref('user/' + userID)
        // var name = $("name-data").val().trim();
        // var name = $("name-data").val().trim();
    });
    //on startup
    //check if this is the users first time
    if (localStorage.getItem('this-user-key')) {
        //assign user a new ID and save it to localStorage
        userID = database.ref('users').push().key;
        localStorage.setItem('this-user-key', userID);
        console.log(userID);

        //neat slide show
        introWebPages[0].display();

        //afterwards set first-time to false
        // localStorage.setItem('first-time', false);
    } else {
        //goto main page
        userID = localStorage.getItem('this-user-key');
        console.log(userID);

        // introWebPages[5].display();
        displayMainPage(userID);
    }

});