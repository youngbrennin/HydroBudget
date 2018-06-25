//variables
var userID, userRef, currentPage, accountInfo, billList = [];
var pieChartData = {
    items: [['test', 1], ['test2', 2], ['test2', 2], ['test2', 2], ['test2', 2], ['test2', 2], ['test2', 2], ['test2', 2], ['test2', 2]],
    title: 'test title please ignore',
    width: '',
    height: '',
    div: 'test'
};
//setters
function settestDate(input) {
    testDate = input;
}
function setPieChartData(items, title, width, height, div) {
    pieChartData = {
        items: items,
        title: title,
        width: width,
        height: height,
        div: div
    };
}
//tester variables
var testDate = "Dec. 31st";

// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
//function to actually display the chart on the webpage
function drawPieChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');//dont think these columns  are used in a pie chart
    data.addColumn('number', 'Slices');
    data.addRows(pieChartData.items);

    // Set chart options
    var options = {
        'title': pieChartData.title,
        'width': pieChartData.width,
        'height': pieChartData.height
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(pieChartData.div));
    chart.draw(data, options);
}
//Pages Array
var WebPages = [
    // newPage('Welcome to Hydro...???', 'This is your first time here so we will guide you through this'),
    /* page 1 */newPage('<div id="mainStarterBox"> <p>Welcome to Hyrdo Budget! Your best source for simply saving money based on your expenses and budget. Click the button below to begin! </p><button id="startButton" class="x next-page-button">Get Started!</button> </div>'),
    /* page 2 */newPage('<div class="container" id="mainStarterBox"> <p class="x">What is your average <a id="toolTipButton" class="tooltipped x" data-position="top" data-tooltip="Net income is the amount of money an individual makes after the usual deductions from a paycheck, such as social security, 401k, taxes, etc...">net</a> income per month?</p> <form> <input id="userInput" type="text" placeholder="Amount" value="" /> </form> <div id="startButton" class="x submit-income next-page-button">Submit</div> </div> </div>'),
    //etc...
    newPage('<div class="container" id="mainStarterBox2"> <p>Starting off with your bills, let&#39;s begin with your expenses that are reoccuring on a monthly basis. <a id="toolTipButton" class="tooltipped x" data-position="top" data-tooltip="Don&#39;t worry, you can add/edit/remove details to this section later on">*</a> Click on the yellow box to to enter a date, and the add button to create a new expense on the list below.</p> <input id="dateStuff" class="datepicker"> <div class="x add submit-new-bill" id="startButton">Add</div> </div>'),

    newPage('<div class="row"> <div id="rightSide" class="col s6"> <div id="netIncome" class="z-depth-3"> Net Monthly Salary <table class=" col s12 style-table1"> <tr class="a"> <td class="month">Monthly:</td> <th class="textId"> $0 </th> <td> <button class="edit-button">EDIT</button> <button class="submit-button">SUBMIT</button> </td> </tr> </table> </div> <div id="totalExpenses" class="z-depth-3"> Total Expenses <div id="totalExpensesDisplayed"> $0 </div> </div> </div> <!-- Everything on the right side of the page--> <!-- THE GREAT PAGE DIVIDE --> <div id="leftSide" class="col s6"> </div> <!-- Everything on the left side of the page--> </div><div id="test"></div>')
];
function swap(data, a, b) {
    var placeholder = data[a];
    data[a] = data[b];
    data[b] = placeholder;
}
function newPage(content) {
    var ret_page = {
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
            var thisPage = $("#content");
            thisPage.hide().empty();
            var thisIndex = WebPages.indexOf(this);
            var prevExist, nextExist;

            console.log("displaying page: ", thisIndex);

            if ((WebPages[thisIndex - 1])) {
                prevExist = true;
            }
            if ((WebPages[thisIndex + 1])) {
                nextExist = true;
            }

            thisPage.html(this.content);
            thisPage.slideDown(800);//allows fast, slow, or an integer in ms
            $('.datepicker').datepicker();
            $(".tooltipped").tooltip();
            if (WebPages.indexOf(currentPage) === WebPages.length - 1) {
                // set pie chart data
                setPieChartData([['test', 1]], 'title', 100, 100, 'test');
                //display pie chart
                google.charts.setOnLoadCallback(drawPieChart);
            }
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
    console.log(Math.ceil(num) + '+' + newSave + '=' + ret);
    return ret;
}

$(document).ready(function () {
    google.charts.load('current', { 'packages': ['corechart'] });
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
    function displayBills() {
        $("#bill-div").empty();
        bubbleSortForBills(accountInfo.bills);
        accountInfo.bills.forEach(function (e) {
            //add <tr>'s to bill-div
            console.log('display');
            var tr = $('<tr>').attr('id', 'bill-' + e.name);
            var td_name = $('<td>').text(e.name);
            var td_amount = $('<td>').text(e.amount);
            var td_date = $('<td>').text(moment(e.date, 'MMM. Do').format('MMM. Do'));
            tr.append(td_name, td_amount, td_date);
            $("#bill-div").append(tr);
        });
    }
    function bubbleSortForBills(array) {
        var swapped;
        if (Array.isArray(array)) {
            do {
                swapped = false;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] && array[i + 1] && moment(array[i].date, 'MMM. Do').format('X') > moment(array[i + 1].date, 'MMM. Do').format('X')) {
                        swap(array, i, i + 1);
                        swapped = true;
                    }
                }
            } while (swapped);
            return array;
        }
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
        WebPages[0].display();

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
            if (accountInfo.bills.length > 1)
                displayBills();
            console.log(accountInfo);
        }
        catch (e) {
            console.error("Account Was Lost or Terminated. User needs to refresh");
            console.error(e);
            // localStorage.setItem('this-user-key', '');
        }
    });

    //D.O.M functions// Becareful when adding .on('click')'s as 
    $("body").on("click", '.submit-new-bill', function () {
        //brings up a new bill to be added on a specific day
        var amount = 1200.45;//capture the value of an text input 
        var amount_budgeted = savingsRound(amount);
        var new_bill = {
            name: $('#bill-name').val().trim(),
            amount: amount,
            amount_budgeted: amount_budgeted,
            amount_saved: amount_budgeted - amount,
            date: moment(testDate, "MMM. Do").format("MMM. Do")
        }
        if (billList.indexOf(new_bill.name) >= 0 || new_bill.name == '') {
            console.log('already exists');
        } else {
            accountInfo.bills.push(new_bill);
            updateBills(accountInfo.bills);
            // displayBills();
        }
    }).on("click", '.submit-income', function () {
        console.log('test');
        var income = numeral(($("#userInput").val().trim()));
        updateSalary(income.value());

    }).on("click", '.delete-bill', function () {
        var name = $(this).attr('bill-name'), index;
        // var name = $('.bill-name').val().trim(), index;
        // accountInfo.bills.forEach(function (bill) 
        for (var i = 0; i < index.length || typeof index !== 'undefined'; i++) {
            if (accountInfo.bills[i].name === name) {
                index = i;
            }
        }
        console.log(index);
        if (typeof index !== 'undefined') {
            accountInfo.bills.splice(index, 1);
            updateBills(accountInfo.bills);
        }
    }).on("click", '.edit-button', function () {
        $(".textId").html("");
        $(".textId").append(
            '<input id="userInput2" type="number" placeholder="Amount" value="" />');
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
    $('.datepicker').datepicker();
});
