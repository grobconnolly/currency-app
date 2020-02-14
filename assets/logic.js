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
        console.log("A long wait may indicate slow internet connection...");
        currencyKey = "4e8b520592221b3422775e55f28b2a2a";
        let currencyListQueryURL = "https://api.currencylayer.com/list?access_key=" + currencyKey;
        // API pull for live currencies to be added to dropdown
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
            
            // Clear "pick a currency..." from dropdown lists
            $(".boxes option").remove();
            
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
        apiKey = "4e8b520592221b3422775e55f28b2a2a";
        liveQueryURL = "https://api.currencylayer.com/live?access_key=" + apiKey + "&source=" + box1CurrencyKey + "&currencies=" + box2CurrencyKey + "&format=1";
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
            // OPTION 1 - both work, different outputs
            $(updated1).text(dateUpdated);
            // OPTION 2 - both work, different outputs
                // $(updated1).text(lastUpdated);

            // Multiply quoteValue by user provided currency1Ammount
            convertedAmmount = currency1Ammount * quoteValue;
            // Display convertedAmmount in currency2Ammount
            $(currency2Ammount).val(convertedAmmount.toFixed(3));
            console.log("Returned currency 2 Value : ", convertedAmmount);
            // console.log("Returned currency 2 Value Fixed : ", convertedAmmountFixed);

            // Beginning with quoteValue, move decimal point over two places to the right to find the exchangeRate percentge
            exchangeRate = (quoteValue * 100);
            exchangeRateFixed = parseFloat(exchangeRate).toFixed( 2) + " %";
            console.log("Exchange Rate : ", exchangeRate);
            console.log("Exchange Rate Fixed: ", exchangeRateFixed);
            // Display exchangeRate in field below currency2Ammount
            $(updated2).text(exchangeRateFixed);

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
                dateUpdated,
                exchangeRate
            }
            console.log("Search History", searchHistory);

            // Setting variables to become global for later use
            window.box1CurrencyText = box1Currency;
            window.currency1AmmountText = currency1Ammount;
            window.box2CurrencyText = box2Currency;
            window.convertedAmmountText = convertedAmmount;
            window.dateUpdatedText = dateUpdated;
            window.exchangeRateText = exchangeRate;
            console.log("window.box1CurrencyText",window.box1CurrencyText);
            
            // Pushing searches to local storage
            searchNum ++ ;
                // let searchHistoryArray = [];
                // searchHistoryArray.push(searchHistory);
            localStorage.setItem("search" + [searchNum],JSON.stringify(searchHistory));
            console.log("Pushing Search History to local storage...")
            console.log("searchNum", searchNum)
            
            // Pulling searches from local storage
            let indexNum = searchNum;
                console.log("Pulling Search History from local storage...");
                let historyPull = localStorage.getItem("search" + [searchNum]);
                console.log("historyPull", historyPull);
                console.log("historyPull TYPE: ", typeof(historyPull));
                let historyParse = JSON.parse(historyPull);
                console.log("historyParse", historyParse);
                console.log("historyParse TYPE: ", typeof(historyParse));
                    // let historyStringy = JSON.stringify(historyPull);
                    // console.log("historyStringy", historyStringy);
                    // console.log("historyStringy TYPE: ", typeof(historyStringy));
                    // let historyFix = JSON.parse(historyStringy); 
                    // console.log("historyFix", historyFix);
            
                box1CurrencyHistory = historyParse.box1Currency;
                console.log("box1CurrencyHistory", box1CurrencyHistory);
                console.log(typeof(box1CurrencyHistory));

                box2CurrencyHistory = historyParse.box2Currency;
                console.log("box2CurrencyHistory", box2CurrencyHistory);
                console.log(typeof(box2CurrencyHistory));

                currency1AmmountPull = (historyParse.currency1Ammount);
                // console.log("currency1AmmountPull", currency1AmmountPull);
                // console.log(typeof(currency1AmmountPull));
                currency1AmmountHistory = parseFloat(currency1AmmountPull).toFixed( 2);
                console.log("currency1AmmountHistory", currency1AmmountHistory);
                console.log(typeof(currency1AmmountHistory));

                convertedAmmountHistory = historyParse.convertedAmmount;
                console.log("convertedAmmountHistory", convertedAmmountHistory);
                console.log(typeof(convertedAmmountHistory));

                exchangeRatePull = historyParse.exchangeRate;
                exchangeRateHistory = parseFloat(exchangeRatePull).toFixed( 2) + " %";
                console.log("exchangeRateHistory", exchangeRateHistory);
                console.log(typeof(exchangeRateHistory));
                

                dateUpdatedPull = (historyParse.dateUpdated)
                dateUpdatedHistory = dateUpdatedPull.substring(0, 19);
                console.log("dateUpdatedHistory", dateUpdatedHistory);
                console.log(typeof(dateUpdatedHistory));

                let tableBody = $(".table tbody");
                let addHistoryRow = "<tr><td>Search # " 
                + indexNum + "</td><td>"
                + box1CurrencyHistory + "</td><td>" 
                + currency1AmmountHistory + "</td><td>"
                + box2CurrencyHistory + "</td><td>"
                + convertedAmmountHistory.toFixed(3) + "</td><td>"
                + exchangeRateHistory + "</td><td>"
                + dateUpdatedHistory + "</td></tr>";

                tableBody.append(addHistoryRow);
                

                // Creating variables for recent searches table data
                    // let search1 = $("#search1");
                    // let key1_1History = $("#key1-1History");
                    // let value1_1History = $("#value1-1History");
                    // let key1_2History = $("#key1-2History");
                    // let value1_2History = $("#value1-2History");
                    // let exchange1_1Rate = $("#exchange1-1Rate");
                    // let date1 = $("#date1");
                // Creating variables for recent searches table data
                    // console.log("indexNum", indexNum);
                    // let searched = $("#search" + [indexNum]).text();
                    // console.log("searched pre", searched);
                    // console.log("searched is type:", typeof(searched));
                    // console.log("indexNum is type:", typeof(indexNum));
                    // $(searched).val(indexNum);
                    // console.log("searched post", searched);

                    // let key_1History = $("#key" + [indexNum] + "-1History");
                    // console.log("key_1History", key_1History);
                    // let value_1History = $("#value" + [indexNum] + "-1History");
                    // console.log("value_1History", value_1History);

                    // let key_2History = $("#key" + [indexNum] + "-2History");
                    // console.log("key_2History", key_2History);
                    // let value_2History = $("#value" + [indexNum] + "-2History");
                    // console.log("value_2History", value_2History);

                    // let exchange_1Rate = $("#exchange" + [indexNum] + "Rate");
                    // console.log("exchange_1Rate", exchange_1Rate);
                    // let date = $("#date" + [indexNum]);
                    // console.log("date", date);

            
            console.log("Ending 'Calculate Button' on-Click function");
            console.log("-----------------------------------");
        });
    // End of calButton click function
    });

    // DISPLAY FLAGS FUNCTION
    // Set variable equal to both boxes
    let options = $(".boxes");
    $(options).on("click", function (event) {
        event.preventDefault();
        
            console.log("Checking chosen countries...")
            let flag1 = $("#flag1");
            let country1 = $(box1).val();
            console.log("country1", country1);
                // console.log("Chosen Country", event.target.value);
            let country1_A3 = country1.substr(country1.length - 3);
            console.log("country1_A3", country1_A3);
            let country1_A2 = countryCodes[country1_A3];
            console.log(country1_A2);

            let flag2 = $("#flag2");
            let country2 = $(box2).val();
            console.log("country2", country2);
            let country2_A3 = country2.substr(country2.length - 3);
            console.log("country2_A3", country2_A3);
            let country2_A2 = countryCodes[country2_A3];
            console.log("country2_A2");

            // Set variable for bitCoin symbol img URL
            let bitCoinQueryURL = "https://icons.iconarchive.com/icons/froyoshark/enkel/64/Bitcoin-icon.png";
            // bitCoin img - http://www.iconarchive.com/icons/froyoshark/enkel/License.txt
                // "This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license,
                //visit http://creativecommons.org/licenses/by/4.0/or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA." 

            // If the currency chosen IS NOT Bitcoin...
            if (country1_A2 !== "BTC") {
                let flag1QueryURL = "https://www.countryflags.io/" + country1_A2 + "/flat/64.png";
                $(flag1).attr("src",flag1QueryURL);
                // Flags - flat provided under MIT licence by GoSquared
                // MIT License - https://github.com/gosquared/flags/blob/master/LICENSE.txt
            }
            // If the currency chosen IS Bitcoin...
            else {
                $(flag1).attr("src",bitCoinQueryURL);            
            }
            // If the currency chosen IS NOT Bitcoin...
            if (country2_A2 !== "BTC") {
                let flag2QueryURL = "https://www.countryflags.io/" + country2_A2 + "/flat/64.png";
                $(flag2).attr("src",flag2QueryURL);
                // Flags - flat provided under MIT licence by GoSquared
                // MIT License - https://github.com/gosquared/flags/blob/master/LICENSE.txt
            }
            // If the currency chosen IS Bitcoin...
            else {
                $(flag2).attr("src",bitCoinQueryURL);
            }
            console.log("Setting chosen country flags")
            console.log("-----------------------------------");
            
        //         // AJAX CALL TO COUNTRYFLAGS API RAN INTO CORS ISSUE; UNABLE TO SOLVE
        //         // $.ajax({
        //         //     url: flag1QueryURL,
        //         //     method: "GET",
        //         //     dataType: "jsonp",
        //         //     contentType: "application/javascript",
        //         //   }).then(function(response) {
        //         //     console.log(response);
        //         //   });
        //         // AJAX CALL TO COUNTRYFLAGS API RAN INTO CORS ISSUE; UNABLE TO SOLVE
        //         // $.ajax({
        //         //     url: flag2QueryURL,
        //         //     method: "GET"
        //         //   }).then(function(response) {
        //         //   });
    // }
    // End of displayFlags click function
    });

    

    //-----CALLING FUNCTIONS-----
    // These functions will run when the HTML has finished loading
    displayDate();
    grabCurrencyList()

// End of document(ready) function
});

// pdf generator onClick function 
        // $("#pdfBtn").click(function(){
        //     // Your Twilio credentials
        //     var SID = "ACd7cc7bb2098ad82117c5025a02de6e1d"
        //     var Key = "ea13799bb683d4fdcb6662b64aac12f3"

        //     $.ajax({
        //         type: 'POST',
        //         url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
        //         data: {
        //             "To" : "+16195362000",
        //             "From" : "+16193047988",
        //             "Body" : "Hello World"
        //         },
        //         beforeSend: function (xhr) {
        //             xhr.setRequestHeader ("Authorization", "Basic " + btoa(SID + ':' + Key));
        //         },
        //         success: function(data) {
        //             console.log(data);
        //         },
        //         error: function(data) {
        //             console.log(data);
        //         }
        //     });
        // });

        // twilio sms onClick function 
  


        $("#pdfBtn").click(function(){
            // Your Twilio credentials
            var SID = "ACd7cc7bb2098ad82117c5025a02de6e1d"
            var Key = "ea13799bb683d4fdcb6662b64aac12f3"
            //This will target the user's phone number input
            let phoneNum = $("#phoneNumberBox").val(); 
            console.log(phoneNum);

            $.ajax({
                type: 'POST',
                url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
                data: {
                            "To" : "+1" + phoneNum,
                            "From" : "+16193047988",
                            "Body" : "Currency 1: " + window.box1CurrencyText + "Principal Amount: " + window.currency1AmmountText + "Currency 2: " + window.box2CurrencyText + "Converted Amount: " + window.convertedAmmountText + "Updated on: " + window.dateUpdatedText + "Exchange Rate: " + window.exchangeRate,
                        },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(SID + ':' + Key));
                },
                success: function(data) {
                    console.log(data);
                },
                error: function(data) {
                    console.log(data);
                }
            });
        });

//Licenses
// Flags - flat provided under MIT licence by GoSquared
// MIT License - https://github.com/gosquared/flags/blob/master/LICENSE.txt

// bitCoin img - http://www.iconarchive.com/icons/froyoshark/enkel/License.txt
// "This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
//or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA."