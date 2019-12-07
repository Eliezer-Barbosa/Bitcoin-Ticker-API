// express provides http methods. in this app, we will be using the post and get methods
const express = require("express");
// body parser process the body of the requests that is sent to express
const bodyParser = require("body-parser");
const request = require("request");
// creating an instance of the express server
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// localhost:3000 for get requests. will be the index.html page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// localhost:3000 as well, but for responses only
app.post("/", function(req, res) {
    
    // crypto is the type of digital currency selected, example: bitcoin
    var crypto = req.body.crypto;
    // fialt is the real currency select to be converted, example euro, dollar
    var fiat = req.body.fiat;
    // the amount to be converted
    var amount = req.body.amount;
    // options object which carry all information to be send to the bitcoin API
    var options = {
        // the API url which our request will be sent
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        // method is GET, because we are getting data
        method: "GET",
        // qs is the query string, which contains values to be append
        // to the url, which is the crypto, fiat and amount
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
    // request method, which gets the options and a callback function
    request(options, function(error, response, body) {
        
        // data has the body data, which all the response we got 
        // from the bitcoin API
        var data = JSON.parse(body);
        // price has only the price from the data
        var price = data.price;

        console.log(price);
        // system current date and time
        var currentDate = data.time;

        // writing the body of the response before sending it
        res.write("<p>The current date is " + currentDate + "</p>");

        res.write("<h1> " + amount + crypto + " is currently worth " + price + fiat + "</h1>");
        
        res.send();

    });
});
// server is listening on port 3000
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});