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
function settestName(input) {
    testName = input;
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
var testName = 'test';

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
// Pages Array
var WebPages = [
    //use &#39 for '
    // newPage('Welcome to Hydro...???', 'This is your first time here so we will guide you through this'),
    /* page 1 */newPage('<div id="mainStarterBox"> <p>Welcome to Hyrdo Budget! Your best source for simply saving money based on your expenses and budget. Click the button below to begin! </p><button id="startButton" class="x next-page-button">Get Started!</button> </div>'),
    /* page 2 */newPage('<div class="container" id="mainStarterBox"> <p class="x">What is your average <a id="toolTipButton" class="tooltipped x" data-position="top" data-tooltip="Net income is the amount of money an individual makes after the usual deductions from a paycheck, such as social security, 401k, taxes, etc...">net</a> income per month?</p> <form> <input id="userInput" type="text" placeholder="Amount" value="" /> </form> <div id="startButton" class="x submit-income next-page-button">Submit</div> </div> </div>'),
    //etc...
    newPage('<div class="container" id="mainStarterBox2"> <p>Starting off with your bills, let&#39s begin with your expenses that are reoccuring on a monthly basis. <a id="toolTipButton" class="tooltipped x" data-position="top" data-tooltip="Don&#39t worry, you can add/edit/remove details to this section later on">*</a> Click on the yellow box to to enter a date, and the add button to create a new expense on the list below.</p> <div class="rowWrapper3 z-depth-3"> <div class="topRowWrapper3"> <div class="firstItemDescription3"> DATE </div> <div class="itemDescription3"> NAME </div> <div class="itemDescription3"> AMOUNT </div> </div> <div class="newBill bh"> <input id="billDateInputTopPage" class="datepicker" placeholder="Date" value=""> <input id="billNameInputTopPage" type="number/text" placeholder="Bill Name" value=""> <input id="billAmountInputTopPage" type="number" placeholder="Amount" value=""> </div> </div> <div class="x add submit-new-bill" id="startButton2">Add</div> <div class="rowWrapper1 z-depth-3"> <div class="topRowWrapper"> <div id="descriptionDate"> DATE </div> <div class="itemDescription"> NAME </div> <div class="itemDescription"> AMOUNT </div> </div> <div id="bill-list"></div> </div> <div class="x add next-page-button" id="startButton2">Submit</div>'),

    newPage('<div class="row"> <div id="leftSide" class="col s5"> <div id="netIncome" class="z-depth-3"> Net Monthly Salary <div class="newBill bh z-depth-3"> <div class="month"> Monthly:</div> <div class="textId">$0</div> <button id="salaryEdit" class="edit-button-2 b bh monthlyEdit">✎</button> <button id="salarySubmit" class="submit-button-2 b bh monthlySubmit">✓</button> </div> </div> <div id="totalExpenses" class="z-depth-3"> Total Expenses <div id="totalExpensesDisplayed"> $0 </div> </div> <div id="NYThead" class="z-depth-3"> Latest Money Related News <div id="NYT"> </div> </div> <div id="chart"></div></div> <!-- Everything on the right side of the page--> <!-- THE GREAT PAGE DIVIDE --> <div id="rightSide" class="col s7"> <div id="allTheBills" class="z-depth-3 dateWrapper"> <div>Add A New Bill!</div> <div class="rowWrapper3 z-depth-3"> <div class="topRowWrapper3"> <div class="firstItemDescription3"> DATE </div> <div class="itemDescription3"> NAME </div> <div class="itemDescription3"> AMOUNT </div> </div> <div class="newBill bh z-depth-3"> <input id="billDateInputTopPage" class="datepicker" placeholder="Date" value=""> <input id="billNameInputTopPage" type="number/text" placeholder="Bill Name" value=""> <input id="billAmountInputTopPage" type="number" placeholder="Amount" value=""> </div> </div> <div class="x add submit-new-bill" id="startButton2">Add</div> </div> <div class="rowWrapper2 z-depth-3"> <div class="billList">Bill List</div> <div class="topRowWrapper"> <div id="descriptionDate"> DATE </div> <div class="itemDescription"> NAME </div> <div class="itemDescription"> AMOUNT </div> </div> <div id="bill-list"></div> </div> </div> <!-- Everything on the left side of the page--> </div>'),

    //some kinda loading page
    newPage("<div class='container' id='mainStarterBox'>Hey! I'm loading here!</div>")
];

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

            console.log("displaying page: ", thisIndex);

            thisPage.html(this.content);
            thisPage.slideDown(800);//allows fast, slow, or an integer in ms
            $('.datepicker').datepicker();
            $(".tooltipped").tooltip();
            switch (thisIndex) {
                case 2: {
                    displayBills();
                };
                    break;
                case WebPages.length - 2: {
                    updateTotalExpensesDiv();
                    updateSalaryDiv();
                    displayBills();
                    displayNews();
                    var graphed_bills = [];
                    accountInfo.bills.forEach(function(e){
                        graphed_bills.push([e.name, e.amount_budgeted]);
                    });
                    setPieChartData(graphed_bills, 'Your Bills!', 400, 200, 'chart');
                    //display pie chart
                    google.charts.setOnLoadCallback(drawPieChart);
                };
                    break;
            }

        }
    }
    return ret_page;
}
function displayBills() {
    $("#bill-list").empty();
    bubbleSortForBills(accountInfo.bills);
    accountInfo.bills.forEach(function (e) {
        //add <tr>'s to bill-div
        console.log('display');
        // var tr = $('<tr>').attr('id', 'bill-' + e.name);
        // var td_name = $('<td>').text(e.name);
        // var td_amount = $('<td>').text(e.amount);
        // var td_date = $('<td>').text(moment(e.date, 'MMM. Do').format('MMM. Do'));


        var tr = $('<div>').attr({
            'class': 'newBill bh',
            'id': 'bill-' + e.name
        });
        var td_name = $('<div>').attr({
            'class': 'billWrapper2',
            'id': 'name-' + e.name
        }).append('<div id="name-' + spacesToUnderscore(e.name) + '" class="billStuff">' + e.name + '</div>');

        var td_amount = $('<div>').attr({
            'class': 'billWrapper3',
            'id': 'amount-' + e.name
        }).append('<div id="amount-' + spacesToUnderscore(e.name) + '"  class="billStuff">' + e.amount + '</div>');

        var td_date = $('<div>').attr({
            'class': 'billWrapper',
            'id': 'date-' + e.name
        }).append('<div id="date-' + spacesToUnderscore(e.name) + '"  class="billStuff">' + e.date + '</div>');

        var rm = $('<button>').attr({
            'class': 'remove-button-2 b bh remove-bill',
            'bill-name': e.name
        }).text('X');

        var ed = $('<button>').attr({
            'class': 'edit-button-2 b bh edit-bill',
            'bill-name': e.name
        }).text('✎');

        var sub = $('<button>').attr({
            'class': 'submit-button-2 b bh confirm-edit-bill',
            'bill-name': e.name
        }).text('✓');

        // <button class="remove-button-2 b bh">REMOVE</button>
        //     <button class="edit-button-2 b bh">EDIT</button>
        //     <button class="submit-button-2 b bh">SUBMIT</button>
        tr.append(td_date, td_name, td_amount, rm, ed, sub);
        $("#bill-list").append(tr);
    });
}
function bubbleSortForBills(array) {
    var swapped;
    if (Array.isArray(array)) {
        do {
            swapped = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i] && array[i + 1] && moment(array[i].date, 'MMM DD, YYYY').format('X') > moment(array[i + 1].date, 'MMM DD, YYYY').format('X')) {
                    swap(array, i, i + 1);
                    swapped = true;
                }
            }
        } while (swapped);
        return array;
    }
}
function swap(data, a, b) {
    var placeholder = data[a];
    data[a] = data[b];
    data[b] = placeholder;
}
function updateTotalExpensesDiv() {
    var total_expenses = numeral(accountInfo.budgeted_bill_total);
    $('#totalExpensesDisplayed').text(total_expenses.format('$00,00'));
}
function updateSalaryDiv() {
    var salary = numeral(accountInfo.salary);
    $('.textId').text(salary.format('$00,00'));
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
function spacesToUnderscore(str){
    var ret = str.split(' ').join('_');
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
        // WebPages[3].display();
        WebPages[WebPages.length - 1].display();

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
                    bills_sum += parseInt(e.amount);
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
            if (accountInfo.bills.length > 0){
                displayBills();
                updateTotalExpensesDiv();
                var graphed_bills = [];
                    accountInfo.bills.forEach(function(e){
                        graphed_bills.push([e.name, e.amount_budgeted]);
                    });
                    setPieChartData(graphed_bills, 'Your Bills!', 400, 200, 'chart');
                google.charts.setOnLoadCallback(drawPieChart);
            }
            console.log(accountInfo);
            console.log('currently on page: ' + WebPages.indexOf(currentPage))
            if (WebPages.indexOf(currentPage) === 4) {
                console.log('done loading');
                currentPage.toPrevious();
            }
        }
        catch (e) {
            console.error("Account Was Lost or Terminated. User needs to refresh");
            console.error(e);
            // localStorage.setItem('this-user-key', '');
        }
    });

    //D.O.M functions//
    $("body").on("click", '.submit-new-bill', function () {
        //brings up a new bill to be added on a specific day
        var this_bill_name = $("#billNameInputTopPage").val().trim(), index;
        var amount = $("#billAmountInputTopPage").val().trim();//capture the value of an text input 
        var amount_budgeted = savingsRound(amount);
        var new_bill = {
            name: this_bill_name,
            amount: amount,
            amount_budgeted: amount_budgeted,
            amount_saved: amount_budgeted - amount,
            date: $("#billDateInputTopPage").val().trim()
        }

        for (var i = 0; i < accountInfo.bills.length; i++) {
            if (accountInfo.bills[i].name === this_bill_name) {
                index = i;
            }
        }
        console.log(index);
        if (typeof index !== 'undefined') {
            console.log('already exists');
        } else {
            accountInfo.bills.push(new_bill);
            updateBills(accountInfo.bills);
        }
    }).on("click", '.submit-income', function () {
        console.log('test');
        var income = numeral(($("#userInput").val().trim()));
        updateSalary(income.value());

    }).on("click", '.confirm-edit-bill', function () {
        var this_bill_name = $(this).attr('bill-name'), index;

        var new_bill_name = $("#billNameInput").val().trim();
        var new_date_name = $("#billDateInput").val().trim();
        var new_amount_name = $("#billAmountInput").val().trim();
        for (var i = 0; i < billList.length; i++) {
            if (accountInfo.bills[i].name === this_bill_name) {
                index = i;
            }
        }
        console.log(accountInfo.bills[index]);
        console.log(new_bill_name, new_date_name, new_amount_name);
        if (!new_bill_name && !new_date_name && !new_amount_name){
            displayBills();
        }
        if (!new_bill_name) {
            new_bill_name = this_bill_name;
        }
        if (!new_date_name) {
            new_date_name = accountInfo.bills[index].date;
        }
        if (!new_amount_name) {
            new_amount_name = accountInfo.bills[index].amount;
        }

        accountInfo.bills[index] = {
            name: new_bill_name,
            amount: new_amount_name,
            amount_budgeted: savingsRound(new_amount_name),
            amount_saved: savingsRound(new_amount_name) - new_amount_name,
            date: new_date_name
        }
        updateBills(accountInfo.bills);
    }).on("click", '.edit-bill', function () {
        console.log('editing')
        var this_bill_name = spacesToUnderscore($(this).attr('bill-name'));
        // <div class="billInputWrapper"><input id="billDateInput" class="datepicker" placeholder="Date" value="" ></div>
        $('#name-' + this_bill_name).attr('class', 'billInputWrapper').html('<input id="billNameInput" type="number/text" placeholder="Bill Name" value="" >');
        $('#date-' + this_bill_name).attr('class', 'billInputWrapper2').html('<input id="billDateInput" class="datepicker" placeholder="Date" value="" >');
        $('#amount-' + this_bill_name).attr('class', 'billInputWrapper3').html('<input id="billAmountInput" type="number" placeholder="Amount" value="" >');
        $('.datepicker').datepicker();
    }).on("click", '.remove-bill', function () {
        var this_bill_name = $(this).attr('bill-name'), index;
        $("#bill-" + this_bill_name).remove();
        for (var i = 0; i < billList.length; i++) {
            if (accountInfo.bills[i].name === this_bill_name) {
                index = i;
            }
        }
        console.log(index);
        if (typeof index !== 'undefined') {
            accountInfo.bills.splice(index, 1);
            updateBills(accountInfo.bills);
        }

    }).on("click", '#salaryEdit', function () {
        console.log('editing salary');
        $(".textId").html('<input type="number" class="userInput">');
    }).on("click", '#salarySubmit', function () {
        accountInfo.salary = $(".userInput").val().trim();
        var salary = numeral(accountInfo.salary);
        $('.textId').text(salary.format('$00,00'));
        updateSalary(salary.value());
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
