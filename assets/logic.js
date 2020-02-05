// Wait until Dom has completed loading
$(document).ready(function() {

// Check that script is successfully linked to index.html
console.log("logic.js is successfully linked");

//-----DECLARING GLOBAL VARIABLES-----
let titleText = $(".titleText");
let dateToday = $(".dateToday");
let pdfButton = $(".pdfButton");

let boxHeader = $(".boxHeader");
let amountText = $(".amountText");

let currency1 = $(".currency1");
let select = $(".select");
let box1 = $("#box1");
let currency1Amount = $("#currency1Amount");
let updated1 = $(".updated1");
let updatedTime1 = $("#updatedTime1");

let blankArea = $(".blankArea");

let currency2 = $(".currency2");
let box2 = $("#box2");
let currency2Amount = $("#currency2Amount");
let updated2 = $("#updated2");
let country2price = $("#country2price");

let calButton = $("#calButton");


//-----BUILDING FUNCTIONS-----
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
$(pdfButton).on("click", function (event) {

});


//-----CALLING FUNCTIONS-----



});