// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// solution
// UNIX timestamp would be an integer
function isInteger(n) {
  return !isNaN(parseInt(n * 1))
};

// GET on the specified endpoint
app.get('/api/timestamp/:date_string?', (req,res) => {
  let date_string;
  
  // First, if date_string empty, return Date.now()
  (req.params.date_string == null) ?
    date_string = new Date(Date.now())
  
    // Then if it is an integer, format UNIX..
    : (isInteger(req.params.date_string)) ?
      date_string = new Date(parseInt(req.params.date_string))
  
      // ..If not, format UTC
      : date_string = new Date(req.params.date_string);

  // Use the specified JSON structure
  let output = {
    "unix": date_string.getTime(),
    "utc": date_string.toUTCString()
  };

  // Check if invalid format
  (date_string == "Invalid Date") ?
    res.json({"error" : "Invalid Date"})
  
    // Final output
    : res.json(output);
});