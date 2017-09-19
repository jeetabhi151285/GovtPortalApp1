const express = require('express');
const router = express.Router();
const passport = require('Passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const request = require('request');
var shortid = require('shortid');
var http = require('http');
var fs = require('fs');
//var uniqueId = shortid.generate();


    function callUpdateBlockChain(req, res){
          
        console.log("witininfunciton ------------------------------------callUpdateBlockChain")
        console.log("req.body-----------------",req.body)
    //    console.log("shortid.generate()-------------------------",uniqueId)
            var postData = {
                        "jsonrpc": "2.0",
                        "method": "invoke",
                        "params": {
                            "type": 1,
                            "chaincodeID": {
                            "name": "561230a20bf00f6a420da1fb69e78d29dc546f9355494c96179377c01c4cb7ce8c6469e57a715e96d206cee17d4dd832176c959fd89573e2435731d466c7a4a6"
                            },
                            "ctorMsg": {
                            "function": "ApproveCandidateDetails",
                            "args": [
                                req.body.candidateId
                                ]
                            },
                            "secureContext": "user_type1_0"
                        },
                        "id": 0
                        } 

          //  var url = 'https://edb67a1a3e8d47e09e35ca067b2da364-vp0.us.blockchain.ibm.com:5004/chaincode';
         //    var url = 'https://a32f499eac924e23ab03900fa0e98519-vp0.us.blockchain.ibm.com:5004/chaincode';
             var url = 'https://edb67a1a3e8d47e09e35ca067b2da364-vp0.us.blockchain.ibm.com:5004/chaincode'; 
            //var postDataObj = JSON.parse(postData);
            var options = {
                method: 'post',
                body: postData,
                json: true,
                url: url,
                headers: {
                        'Content-Type': 'application/json'
                    }
                }

                request(options, function (err, response, body) {
                if (err) {
                    console.error('error posting json: ', err)
                    throw err
                }
                    var headers = response.headers
                    var statusCode = response.statusCode
                    var statusCodeResponse = response.body

               //     var data = body.result.message;
               //     var arrayOfObjects = JSON.parse(data);
                    console.log("statusCodeResponse>>>>>>>>>>>>>>>>>>>>",statusCodeResponse)
                    console.log('headers: ', headers);
                    console.log('statusCode:************************** ', statusCode);
                    console.log('body:=============> ', body);
                    res.send(body);
                  //  res.json(arrayOfObjects);

                });
    }

    router.post('/update',(req, res, next) => {
        console.log("within update ------------------------------------")
     //   var uniqueId = shortid.generate();
        
        callUpdateBlockChain(req, res);
      //  res.send(uniqueId);
    });



module.exports = router;