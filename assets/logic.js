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

let pdfButton = $(".pdfButton");

let boxHeader = $(".boxHeader");
let amountText = $(".ammountText");

let currency1 = $(".currency1");
let select = $(".select");
let box1 = $("#box1");
let currency1Amount = $("#currency1Ammount");
let updated1 = $(".updated1");
let updatedTime1 = $("#updatedTime1");

let blankArea = $(".blankArea");

let currency2 = $(".currency2");
let box2 = $("#box2");
let currency2Amount = $("#currency2Ammount");
let updated2 = $("#updated2");
let country2price = $("#country2price");

let calButton = $("#calButton");


//-----BUILDING FUNCTIONS-----
// API pull for the currencies to be added to dropdown
button.addEventListener("click", function(name){
    fetch("http://data.fixer.io/api/latest?access_key=046374ead830a8a183f4c823ed1d0bc2")



});




// Build onClick dropDown functions for box 1 and box 2
// When user clicks dropDown 
$(select).on("click", function (event) {

});


// Build onClick calculate function for calButton
// When user clicks calButton, 
$(calButton).on("click", function (event) {

});



// Build onClick generate PDF function for 'a'
// When user clicks 'a', a PDF is generated including 'a screenshot of the app in its current state'.
// Then a link to a PDF is generated and then opened in the new window.
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

    /* <embed
        type="application/pdf"
        src="path_to_pdf_document.pdf"
        id="pdfDocument"
        width="100%"
        height="100%" />
     */

//     $(pdfButton).on("click", function (event) {
//         function printDocument(documentId) {
//             var doc = document.getElementById(documentId);
        
//             //Wait until PDF is ready to print    
//             if (typeof doc.print === 'undefined') {    
//                 setTimeout(function(){printDocument(documentId);}, 1000);
//             } else {
//                 doc.print();
//             }
//         }
// });


//-----CALLING FUNCTIONS-----


});