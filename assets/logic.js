// Wait until Dom has completed loading
$(document).ready(function() {

//Current date using moment.js
// moment().format("MMM Do YY");

// Check that script is successfully linked to index.html
console.log("logic.js is successfully linked");

//-----DECLARING GLOBAL VARIABLES-----
let dateToday = $(".dateToday");
let currentDate = moment().format('dddd') + " " + moment().format("MMM Do");
let box1 = $("#box1");
let box2 = $("#box2");
let calButton = $("#calBtn");
    // let pdfButton = $(".pdfButton");
let searchNum = 0;

//-----BUILDING FUNCTIONS-----
// FUNCTION DISPLAY DATE
// Display Current Date at top of app
function displayDate() {
console.log(currentDate);
dateToday.text(currentDate);
};

// FUNCTION GRABCURRENCYLIST
// Setting variable for all currencies that can be requested
// This list will populate the dropdown menus
function grabCurrencyList() {
    console.log("Requesting Currency lists...");
    let currencyListQueryURL = "http://api.currencylayer.com/list?access_key=4e8b520592221b3422775e55f28b2a2a"
    $.ajax({
        url: currencyListQueryURL,
        method: "GET"
    })
    // After the data from the AJAX request comes back
    .then(function(response) {
        console.log("response", response);
        // Saving the Currency List Data
        currencyList = response.currencies;            
        console.log("currencyList", currencyList);

        // Grabbing currency keys
        currencyKeys = Object.keys(currencyList);
        console.log("currency keys", currencyKeys);
        // Grabbing currency values
        currencyValues = Object.values(currencyList);
        console.log("currency values", currencyValues);
        // Combining currency keys and values
        let currencyOptions = _.zip(currencyValues, currencyKeys);
        console.log("currencyOptions", currencyOptions);

        // API pull for live currencies to be added to dropdown
        console.log("Populating Dropdown lists...");
        // For each currency in the currency list array, create an option containing 'currencyOptions'
        $.each(currencyOptions, function(i, currency) {
            box1.append("<option>" + currency + "</option>");
            // box1.option.addClass(currencyKeys[i]);
            box2.append("<option>" + currency + "</option>")
        });    
    console.log("Dropdown lists have been populated");
    console.log("-----------------------------------");
    // End of .then() function
    });
// End of grabCurrencyList function
};

//  CALCULATE FUNCTION for calButton
// When user clicks calButton, 
$(calButton).on("click", function (event) {
    event.preventDefault();
    console.log("Beginning 'Calculate Button' on-Click function");

    // Creating variables for reading from and writing to currency ammount fields
    let currency1Ammount = $("#currency1Ammount").val();
    console.log("User currency 1 Value : ", currency1Ammount);
    let currency2Ammount = $("#currency2Ammount");
    // Creating variables for meta data
    let updated1 = $(".updated1");
    let updated2 = $("#updated2");

    // Creating variables for currencies and currency keys
    let box1Currency = $(box1).val();
    console.log("User currency 1 : ", box1Currency);
    // 'box1CurrencyKey' is currently unused other than console.log for meta
    let box1CurrencyKey = box1Currency.substring(box1Currency.length - 3, box1Currency.length);
    console.log("User currency 1 KEY : ", box1CurrencyKey);
    let box2Currency = $(box2).val();
    console.log("User currency 2 : ", box2Currency);
    // 'box2CurrencyKey' is currently unused other than console.log for meta
    let box2CurrencyKey = box2Currency.substring(box2Currency.length - 3, box2Currency.length);
    console.log("User currency 2 KEY : ", box2CurrencyKey);

    // Storing our URL for a 'Live' currency request
    liveQueryURL = "http://api.currencylayer.com/live?access_key=4e8b520592221b3422775e55f28b2a2a&currencies=" + box1Currency + box2Currency + "&format=1";
    // Perfoming an AJAX GET request to our 'Live' queryURL
    $.ajax({
        url: liveQueryURL,
        method: "GET"
    })
    // After the data from the AJAX request comes back
    .then(function(response) {
        console.log("live currency response", response);
        // Quote is set to the key of 'currency2' with a value of 'how many of currency2 is equal to 1 unit of currency1'
        quote = response.quotes
        console.log("quote", quote);
        // Variable for currency2's currency Key
        quoteKey = Object.keys(quote);
        console.log("quoteKey", quoteKey);
        // quoteValue is set to how many of currency2 is equal to 1 unit of currency1
        quoteValue = Object.values(quote);
        console.log("quoteValue", quoteValue);

        // Variable for unix code format timestamp
        timeStamp = response.timestamp
        console.log("timeStamp : ", timeStamp);
        // Full updated date
        dateUpdated = new Date(timeStamp * 1000);
        console.log("date updated : ", dateUpdated);
        // Stringified full updated date
        dateString = JSON.stringify(dateUpdated);
        // Extracted updated date
        lastUpdated = dateString.substring(0, 20);
        console.log("last updated on ", lastUpdated);
        // Display lastUpdated in field below currency1Ammount
        $(updated1).text(lastUpdated);

        // Multiply quoteValue by user provided currency1Ammount
        convertedAmmount = currency1Ammount * quoteValue;
        // Display convertedAmmount in currency2Ammount
        $(currency2Ammount).val(convertedAmmount);
        console.log("Returned currency 2 Value : ", convertedAmmount);

        // Beginning with quoteValue, move decimal point over two places to the right to find the exchangeRate percentge
        exchangeRate = (quoteValue * 100) + " %";
        console.log("Exchange Rate : ", exchangeRate);
        // Display exchangeRate in field below currency2Ammount
        $(updated2).text(exchangeRate);

        // Creating Search History nested arrays to push to and pull from
        // Push all search information into arrays, and nest those arrays into an object       
            // OPTION 1 for history; both work, just different output
            // let searchHistoryCurrency1 = [];
            // searchHistoryCurrency1.push(box1Currency);
            // let searchHistoryCurrency2 = [];
            // searchHistoryCurrency2.push(box2Currency);
            // let searchHistoryCurrencies = _.zip(searchHistoryCurrency1, searchHistoryCurrency2); 

            // let searchHistoryValue1 = [];
            // searchHistoryValue1.push(currency1Ammount);
            // let searchHistoryValue2 = [];
            // searchHistoryValue2.push(convertedAmmount);
            // let searchHistoryValues = _.zip(searchHistoryValue1, searchHistoryValue2);
            
            // let searchHistoryDate = [];
            // searchHistoryDate.push(lastUpdated);
            // let searchHistoryRate = [];
            // searchHistoryRate.push(exchangeRate);
            // let searchHistoryMeta = _.zip(searchHistoryDate, searchHistoryRate);

            // let searchHistory = _.zip(searchHistoryCurrencies, searchHistoryValues, searchHistoryMeta);

        // OPTION 2 for history; both work, just different output
        console.log("Collecting data for Search History...")
        let searchHistory = {
            box1Currency,
            box2Currency,
            currency1Ammount,
            convertedAmmount,
            lastUpdated,
            exchangeRate
        }
        console.log("Search History", searchHistory);
        
        // Pushing searches to local storage
        searchNum ++ ;
        let searchHistoryArray = [];
        searchHistoryArray.push(searchHistory);
        localStorage.setItem("search" + [searchNum],JSON.stringify(searchHistoryArray));
        console.log("Pushing Search History to local storage...")
        console.log("searchNum", searchNum)
        
        // Pulling searches from local storage
        let indexNum = searchNum;
        
            let historyPull = localStorage.getItem("search" + [searchNum]);
            let historyParse = JSON.parse(historyPull);
            console.log("Pulling Search History from local storage...")
            console.log("historyPull", historyPull)
            console.log("historyParse", historyParse)
            
            // Creating variables for recent searches table data
                // let search1 = $("#search1");
                // let key1_1History = $("#key1-1History");
                // let value1_1History = $("#value1-1History");
                // let key1_2History = $("#key1-2History");
                // let value1_2History = $("#value1-2History");
                // let exchange1_1Rate = $("#exchange1-1Rate");
                // let date1 = $("#date1");

            console.log("indexNum", indexNum);

            let searched = $("#search" + [indexNum]).text();
            $(searched).text(toString(indexNum));
            console.log("searched", searched);
            let key_1History = $("#key" + [indexNum] + "-1History");
            console.log("key_1History", key_1History);
            let value_1History = $("#value" + [indexNum] + "-1History");
            console.log("value_1History", value_1History);
            let key_2History = $("#key" + [indexNum] + "-2History");
            console.log("key_2History", key_2History);
            let value_2History = $("#value" + [indexNum] + "-2History");
            console.log("value_2History", value_2History);
            let exchange_1Rate = $("#exchange" + [indexNum] + "Rate");
            console.log("exchange_1Rate", exchange_1Rate);
            let date = $("#date" + [indexNum]);
            console.log("date", date);

            // let _row = $(".table").parents("tr");
            // let cols = _row.children("td");
            // $("#search" + [indexNum]).val($(cols[1]).text(indexNum));
            // $("#key" + [indexNum] + "-1History").val($(cols[2]).text());
            // $("#value" + [indexNum] + "-1History").val($(cols[3]).text());

        
        console.log("Ending 'Calculate Button' on-Click function");
        console.log("-----------------------------------");
    });

// End of calButton click function
});

// DISPLAY FLAGS FUNCTION

function displayFlags () {
    
    setTimeout(() => {
        let flag1 = $("#flag1");
        let country1_A3 = $(box1).val();
        console.log(country1_A3);
        let country1_A2 = "";
        console.log("country1_A2");

        // flag1QueryURL = "https://www.countryflags.io/" + country1_A2 + "/flat/64.png";
        // $.ajax({
        //     url: flag1QueryURL,
        //     method: "GET"
        //   }).then(function(response) {
        
        //   });

        let flag2 = $("#flag2");  
        let country2_A3 = $(box2).val();
        console.log(country2_A3);
        let country2_A2 = "";
        console.log("country2_A2");
        
        // flag2QueryURL = "https://www.countryflags.io/" + country2_A2 + "/flat/64.png";
        // $.ajax({
        //     url: flag2QueryURL,
        //     method: "GET"
        //   }).then(function(response) {
        
        //   });
        }, 2000);

    
}


//-----CALLING FUNCTIONS-----
// These functions will run when the HTML has finished loading
displayDate();
grabCurrencyList();
displayFlags ();


// End of document(ready) function
});



// Start of Generate PDF function
// This function will run when user clicks the pdf button
// generate pdf ref https://stackoverflow.com/questions/16858954/how-to-properly-use-jspdf-library

function demoFromHTML() {
    console.log("Beginning pdf on-Click function");
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#currencyPDF')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.save('currency.pdf');
        }, margins
    );
    console.log("Ending pdf on-Click function");
    console.log("-----------------------------------");
}

