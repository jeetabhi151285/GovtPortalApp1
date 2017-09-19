const express = require('express');
const router = express.Router();
const http = require("http");
var https = require("https");
var URL = require("url");
var request = require('request');
var fs = require('fs');

function fetchRecordsFromBlockChain(req, res){
    var dataObj = "";
    console.log("within fetchRecordsFromBlockChain -----------------------------------")
    var postData = {
            "jsonrpc": "2.0",
            "method": "query",
            "params": {
                "type": 1,
                "chaincodeID": {
                     "name": "561230a20bf00f6a420da1fb69e78d29dc546f9355494c96179377c01c4cb7ce8c6469e57a715e96d206cee17d4dd832176c959fd89573e2435731d466c7a4a6"
                },
                "ctorMsg": {
                "function": "getAllCandidate",
                "args": []
                },
                "secureContext": "user_type1_0"
            },
            "id": 0
    }
        
   // var url = 'https://a32f499eac924e23ab03900fa0e98519-vp0.us.blockchain.ibm.com:5004/chaincode';
    var url = 'https://edb67a1a3e8d47e09e35ca067b2da364-vp0.us.blockchain.ibm.com:5004/chaincode';

    var post_options = {
        method: 'post',
	    body: postData,
	    json: true,
	    url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }

      request(post_options, function(req, respnose, body) {
       console.log("body:::::::::::::::::::::::::::::::::::::::::::::::",body)
            var data = body.result.message;
            var arrayOfObjects = JSON.parse(data);
            var pepoleInfromationJson = JSON.stringify(arrayOfObjects);
            var peopleInformation = [pepoleInfromationJson]

        //    dataObj = JSON.stringify(arrayOfObjects)

        console.log("data[][][][][][][][][]][][][]]][[][][][][][]][]",arrayOfObjects);

     //   fs.writeFile('angular-src/src/app/components/registertable/people.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {

     //       console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
     //     if (err) {
     //           console.log("error writing /data/people.json");
     //       } else {
     //           console.log("JSON file written to /data/people.json");
     //        }
     //      });
        
        //  res.json({ data: [respnose, pepoleInfromationJson]});
        //   res.json({ data: [pepoleInfromationJson]});
            res.json(arrayOfObjects);
        
      
    });

   // return res.send();

}


router.get('/getallrecords',(req, res) => {
        console.log("within getallrecords ------------------------------------")
        fetchRecordsFromBlockChain(req, res);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      //  req.send();
        console.log("sssssssssssssssssssssssssssssssssssssssssssss")
        
});

module.exports = router;