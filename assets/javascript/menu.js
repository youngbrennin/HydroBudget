//variables
var userID, userRef, currentPage, accountInfo, billList = [];
//Pages Array
var WebPages = [
    // newPage('Welcome to Hydro...???', 'This is your first time here so we will guide you through this'),
    /* page 1 */newPage('<p>Welcome to Hyrdo Budget! Your best source for simply saving money based on your expenses and budget. Click the button below to begin!</p>', '<button id="startButton" class="x next-page-button">Get Started!</button>'),
    /* page 2 */newPage("Let's get started!", '<p>What is your average <a id="toolTipButton" class="btn tooltipped" data-position="top" data-tooltip="I dont like to work!">net</a> income per month?</p><form><input id="userInput" type="text" placeholder="Type Here" value="" /></form><div id="startButton" class="submit-income next-page-button">Submit</div>'),
    //etc...
    newPage("Let's add a bill!", "<input type='text' id='bill-name'><button class='submit-new-bill'>hey</button><button class='delete-bill'>delete</button>"),
];

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


function savingsRound(num) {
    var newSave = Math.ceil((num * .15));
    var ret = Math.ceil(num) + newSave;
    //add newSave to total amount saved in the users data
    var bonusSaved = ret - num;
    // console.log("User has saved up " + bonusSaved + " from this bill!");
    console.log(Math.ceil(num) + '+' + newSave + '=' + ret)
    return ret;
}

$(document).ready(function () {
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

    //Firebase Updating Functions
    function updateAccountInfo(name, salary, bills) {
        console.log(name, salary, bills);
        database.ref(userRef).set({
            name: name,
            salary: salary,
            bills: bills,
        });
    }
    function updateName(name) {
        updateAccountInfo(name, accountInfo.salary, accountInfo.bills);
    }
    function updateSalary(salary) {
        updateAccountInfo(accountInfo.name, salary, accountInfo.bills);
    }
    function updateBills(bills) {
        updateAccountInfo(accountInfo.name, accountInfo.salary, bills);
    }

    // Load the Visualization API and the corechart package.
    // google.charts.load('current', { 'packages': ['corechart'] });

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

    //Startup
    if (!localStorage.getItem('this-user-key')) {//new user
        //assign user a new ID and save it to localStorage
        userID = database.ref('users').push({
            name: 'N/A',
            salary: 0,
            bills: [],
        }).key;
        localStorage.setItem('this-user-key', userID);
        userRef = 'users/' + userID;
        console.log('created: ' + userID);

        //neat slide show
        WebPages[0].display();
    }
    else {//old user
        userID = localStorage.getItem('this-user-key');
        userRef = 'users/' + userID;
        console.log('loaded: ' + userID);
        WebPages[2].display();
    }

    //Firebase Data Functions
    database.ref(userRef).on("value", function (snapshot) {
        // console.log(userRef, typeof userRef);
        // console.log('users/-LFhx0kykShDdCi9BHD-', typeof 'users/-LFhx0kykShDdCi9BHD-');
        // console.log('updating accountInfo on ', snapshot.val());
        try {
            var bills = snapshot.val().bills;
            if (!Array.isArray(bills)) {
                bills = [];
            }
            else {
                var bills_sum = 0;
                var bugeted_bill_sum = 0;
                var total_saved_sum = 0;
                billList = [];
                bills.forEach(function (e) {
                    bills_sum += e.amount;
                    bugeted_bill_sum += e.amount_budgeted;
                    total_saved_sum += e.amount_saved;
                    billList.push(e.name);
                });
            }
            accountInfo = {
                name: snapshot.val().name,
                salary: snapshot.val().salary,
                bills: bills,
                bill_total: bills_sum,
                budgeted_bill_total: bugeted_bill_sum,
                total_saved: total_saved_sum
            }
            console.log(accountInfo)
        }
        catch (e) {
            console.error("Account Was Lost or Terminated. User needs to refresh");
            console.error(e);
            localStorage.setItem('this-user-key', '');
        }
    });



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

    //D.O.M functions// Becareful when adding .on('click')'s as 
    $("#mainStarterBox").on("click", '.submit-new-bill', function () {
        //brings up a new bill to be added on a specific day
        var amount = 1200.45;//capture the value of an text input 
        var amount_budgeted = savingsRound(amount);
        var new_bill = {
            name: $('#bill-name').val().trim(),
            amount: amount,
            amount_budgeted: amount_budgeted,
            amount_saved: amount_budgeted - amount,
            date: 'today'
        }
        if (billList.indexOf(new_bill.name) >= 0 || new_bill.name == '') {
            console.log('already exists');
        } else {
            accountInfo.bills.push(new_bill);
            updateBills(accountInfo.bills);
        }
    }).on("click", '.submit-income', function () {
        var income = numeral(($("#userInput").val().trim()));
        updateSalary(income.value());
        // console.log(accountInfo);
        // updateAccountInfo('1', income.value(), [1]);
        // console.log(accountInfo);

    }).on("click", '.delete-bill', function () {
        var name = $('#bill-name').val().trim(), index;
        accountInfo.bills.forEach(function (bill) {
            if (bill.name === name) {
                index = accountInfo.bills.indexOf(bill);
            }
        });
        console.log(index);
        if (typeof index !== 'undefined') {
            accountInfo.bills.splice(index, 1);
            updateBills(accountInfo.bills);
        }
    }).on("click", '.next-page-button', function () {
        console.log('going to next page');
        currentPage.toNext();
    }).on("click", '.prev-page-button', function () {
        console.log('going to previous page');
        currentPage.toPrevious();
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

});