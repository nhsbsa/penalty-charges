var express = require('express');
var router = express.Router();
var attempt = 0;



//import the content
var Content = require('./content.js');
var content = Content.content;

var hasBen;
var dd;

var resetAll = function () {

    content.updateContent("D");
    content.hasBen = 'no';
    console.log(hasBen);
    
};

// ****************************************
// Pecs enquiry
// ****************************************

//DWP journey
// Michelle Doe


// Date of birth = 01 / 01 / 2000
// 1st Line of Address = 55 Peachfield Road
// Postcode = LL67 3SN
// Letter reference number = 


module.exports = router;