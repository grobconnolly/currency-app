//Current date using moment.js
// moment().format("MMM Do YY");

// Wait until Dom has completed loading
$(document).ready(function() {

// Check that script is successfully linked to index.html
console.log("logic.js is successfully linked");

//-----DECLARING GLOBAL VARIABLES-----
let titleText = $(".titleText");

// Display Current Date at top of app
let dateToday = $(".dateToday");
let currentDate = moment().format('dddd') + " " + moment().format("MMM Do");
dateToday.text(currentDate);
let boxHeader = $(".boxHeader");
        // let amountText = $(".ammountText");
        // let currency1 = $(".currency1");
        // let select = $(".select");
let box1 = $("#box1");
let currency1Ammount = $("#currency1Ammount").val();
let updated1 = $(".updated1");
        // let updatedTime1 = $("#updatedTime1");
let blankArea = $(".blankArea");
        // let currency2 = $(".currency2");
let box2 = $("#box2");
let currency2Ammount = $("#currency2Ammount").val();
let updated2 = $("#updated2");
        // let country2price = $("#country2price");
let calButton = $("#calBtn");
let pdfButton = $(".pdfButton");

let currencyListString;
// let currencyStringJoin;

// Storing our URL for a 'Historical' currency request
// historicalQueryURL = "http://www.api.currencylayer.com/historical?access_key=4e8b520592221b3422775e55f28b2a2a;"

// Following request not supported by my api subscription
            // // Storing our URL for a 'Convert' currency request
            // convertQueryURL = "http://www.api.currencylayer.com/convert?access_key=4e8b520592221b3422775e55f28b2a2a&from=" + "" "&to=" + "";


//-----BUILDING FUNCTIONS-----
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
        console.log(response);
        // Saving the Currency List Data
        currencyList = response.currencies;
        console.log(Object.keys(currencyList));
            
        
        currencyListArray = JSON.stringify(response.currencies);
        currencyListString = currencyListArray;
        console.log(currencyList);
        console.log("# of Currencies supported on next line");
        console.log(currencyListArray.length);
    
        // API pull for live currencies to be added to dropdown
        console.log("Popluating Dropdown lists...");
        // For each currency in the currency list array,
        
        $.each(currencyList, function(i, currency) {
            box1.append("<option>" + currency + "" + "</option>");
        });

        $.each(currencyList, function(i, currency) {
            box2.append("<option>" + currency + "" + "</option>");
        });
        console.log(response.currencies);
        // console.log(currencyListString);
        console.log("Dropdown lists have been populated");

        // Creating variable that contains all available currencies as a string
                // currencyStringJoin = currencyListString.join(",");
                // console.log(currencyStringJoin);
        
        // Commenting out below for loop for now; replaced by above .each functions
                // for (i = 0; i <= currencyListArray.length; i++) {
                //     // Creating variable for options in dropDown menus
                //     let currencyOptions = $("<option>");
                //     $(currencyOptions).addClass("currencies");
                //         // $(currencyOptions).attr("id", currencyListArray.i)
                    
                //     // Displaying currencies in the options
                //     //  Currently trying to figure out how to target the data for each currency
                //     currentCurrency = currencyListArray;
                //     console.log(currentCurrency);
                //     $(currencyOptions).text(currentCurrency);

                //     // Append currencies to dropDown menus
                //     // Currently, box 1 is blank and 2 is populated, but if i comment out box 2, box 1 works
                //     $(box1).append(currencyOptions);
                //     $(box2).append(currencyOptions);

                // };
    });
};



// --Commenting out below function for now--
        // button.addEventListener("click", function(name){
        //     fetch("http://data.fixer.io/api/latest?access_key=046374ead830a8a183f4c823ed1d0bc2")
        // for(i = 0; i<currency1.currency2; i++);
        // });


// Build onClick calculate function for calButton
// When user clicks calButton, 


$(calButton).on("click", function (event) {

    // Storing our URL for a 'Live' currency request
    liveQueryURL = "http://api.currencylayer.com/live?access_key=4e8b520592221b3422775e55f28b2a2a&currencies=" + currencyStringJoin + "&format=1";

    // Perfoming an AJAX GET request to our 'Live' queryURL
    $.ajax({
        url: liveQueryURL,
        method: "GET"
    })
    // After the data from the AJAX request comes back
    .then(function(response) {
        console.log(response);
        console.log(response.quotes);

        // Saving the Live Currency Data
        let liveResponse = response;
        // Displaying the currency2 value
        // currency2Ammount.text("");
    });

});


// Build onClick generate PDF function for 'a'
// When user clicks 'a', a PDF is generated including 'a screenshot of the app in its current state'.
// Then a link to a PDF is generated and then opened in the new window.

// --Commenting out below function for now--
        // $(pdfButton).on("click", function (event) {
        //     if (typeof doc.print === 'undefined') {    
        //         setTimeout(function(){printDocument(documentId);}, 1000);
        //     } else {
        //         doc.print();
        //     }
        // <embed
        //     type="application/pdf"
        //     src="path_to_pdf_document.pdf"
        //     id="pdfDocument"
        //     width="100%"
        //     height="100%" />
        // });



//-----CALLING FUNCTIONS-----
// This function will run when the HTML has finished loading
grabCurrencyList();


});

// generate pdf ref https://stackoverflow.com/questions/16858954/how-to-properly-use-jspdf-library

function demoFromHTML() {
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
            pdf.save('Test.pdf');
        }, margins
    );
}