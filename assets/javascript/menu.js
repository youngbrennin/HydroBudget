$(document).ready(function () {
    console.log(savingsRound(23.47));

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
    // google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    // google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    // function drawChart() {

    //     // Create the data table.
    //     var data = new google.visualization.DataTable();
    //     data.addColumn('string', 'Topping');
    //     data.addColumn('number', 'Slices');
    //     data.addRows([
    //         ['Mushrooms', 3],
    //         ['Onions', 1],
    //         ['Olives', 1],
    //         ['Zucchini', 1],
    //         ['Pepperoni', 2]
    //     ]);

    //     // Set chart options
    //     var options = {
    //         'title': 'How Much Pizza I Ate Last Night',
    //         //  'width':400,
    //         'height': 300
    //     };

    //     // Instantiate and draw our chart, passing in some options.
    //     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    //     chart.draw(data, options);
    // }
    // Other Functions
    function updateAccountInfo(name, salary, bills) {
        if (typeof bills === 'undefined'){
            bill = accountInfo.bills;
            console.log("bills unchanged", bill);
        }

        console.log(name, salary, bills);

        database.ref(userRef).set({
            name: name,
            salary: salary,
            bills: bills
        });
        
    }

    

    function savingsRound(num) {
        var newSave = Math.ceil((num * .15));
        var ret = Math.ceil(num) + newSave;
        //add newSave to total amount saved in the users data
        var bonusSaved = ret - num;
        console.log("User has saved up " + bonusSaved + " from this bill!");
        return ret;
    }
    //variables
    var userID, userRef;
    var accountInfo = {
    }
    //
    database.ref(userRef).on("child_changed", function(snap){
        accountInfo = {
            name: snap.val().name,
            salary: snap.val().salary,
            bills: snap.val().bills,
        }
    });
    //Pages Array
    var WebPages = [
        // newPage('Welcome to Hydro...???', 'This is your first time here so we will guide you through this'),
        /* page 1 */newPage('<p>Welcome to Hyrdo Budget! Your best source for simply saving money based on your expenses and budget. Click the button below to begin!</p>', '<button id="startButton" class="x next-page-button">Get Started!</button>'),
        /* page 2 */newPage("Let's get started!", '<p>What is your average <a id="toolTipButton" class="btn tooltipped" data-position="top" data-tooltip="I dont like to work!">net</a> income per month?</p><form><input id="userInput" type="text" placeholder="Type Here" value="" /></form><div id="startButton" class="submit-income">Submit</div>'),
    ];
    var currentPage;

    //Pages
    function newPage(header, content) {
        var ret_page = {
            header: header,
            content: content,
            toNext: function () {
                var nextIndex = WebPages.indexOf(this) + 1;
                WebPages[nextIndex].display();
            },
            toPrevious: function () {
                var prevIndex = WebPages.indexOf(this) - 1;
                WebPages[prevIndex].display();
            },
            display: function () {
                currentPage = this;
                $("#mainStarterBox").empty().hide();
                var thisIndex = WebPages.indexOf(this);
                var prevExist, nextExist;

                console.log("displaying page: ", thisIndex);

                if ((WebPages[thisIndex - 1])) {
                    prevExist = true;
                }
                if ((WebPages[thisIndex + 1])) {
                    nextExist = true;
                }

                var thisPage = $("#mainStarterBox");
                thisPage.append('<div>' + this.header + '</div>');
                thisPage.append(this.content);
                thisPage.slideDown(800);//allows fast, slow, or an integer in ms
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

    $("#mainStarterBox").on("click", '.next-page-button', function () {
        console.log('going to next page');
        currentPage.toNext();
    }).on("click", '.prev-page-button', function () {
        console.log('going to previous page');
        currentPage.toPrevious();
    }).on("click", '.new-bill', function () {
        //brings up a new bill to be added on a specific day
        var new_bill = {
        }
    }).on("click", '.submit-income', function(){
        var income = parseInt($("#userInput").val().trim());
        updateAccountInfo('me', income, [1]);

    });

    // $("personal-data-form").on("click", 'submit-personal-data', function () {
    //     var name = $("name-data").val().trim();
    //     var salary = $("salary-data").val().trim();
    //     var timeFrame = $("salary-time-frame-data").val().trim();
    //     //salary is required, timeFrame should be a dropdown menu
    //     database.ref('user/' + userID)
    //     // var name = $("name-data").val().trim();
    //     // var name = $("name-data").val().trim();
    // });
    //on startup

    //check if this is the users first time
    if (!localStorage.getItem('this-user-key')) {
        //assign user a new ID and save it to localStorage
        userID = database.ref('users').push().key;
        localStorage.setItem('this-user-key', userID);
        console.log(userID);

        //neat slide show
        WebPages[0].display();
    } 
    else {
        userID = localStorage.getItem('this-user-key');
        userRef = 'users/' + userID;
        console.log(userID);

        

        WebPages[1].display();
    }

});