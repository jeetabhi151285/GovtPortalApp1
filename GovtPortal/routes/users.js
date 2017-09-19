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
var uniqid = require('uniqid');
//var uniqueId = shortid.generate();


    function callBlockChain(req, res, uniqueId, identificationno){
          
        console.log("witininfunciton ------------------------------------")
        console.log("shortid.generate()-------------------------",uniqueId)
     //   console.log("identificationno????????????????????????",identificationno)
            var postData = {
                "jsonrpc" : "2.0",
                "method": "invoke",
                "params":{
                    "type": 1,
                    "chaincodeID": {
                          "name": "561230a20bf00f6a420da1fb69e78d29dc546f9355494c96179377c01c4cb7ce8c6469e57a715e96d206cee17d4dd832176c959fd89573e2435731d466c7a4a6"
                    },
                    "ctorMsg": {
                        "function": "RegisterCandidate",
                        "args": [
                            uniqueId,
                            req.body.title,
                            req.body.gender,
                            req.body.firstName,
                            req.body.lastName,
                            req.body.dob,
                            req.body.email,
                            req.body.phoneno,
                            req.body.identification,
                            req.body.identificationno,
                            req.body.nationality,
                            req.body.address,
                            req.body.country,
                            req.body.city,
                            req.body.pincode,
                            req.body.state
                        ]
                    },
                    "secureContext": "user_type1_0"
                },
                "id": 1

            }
           //1610122035e4cf43e5f51d51194cfba1d0ca5f9675f28535f5c3351f30559fd4aab1e0f8d1a3bc0bd66770ac38d670ccfdecd3d3edc0dff9023808e9a9fe2bf9
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
                    console.log('headers: ', headers);
                    console.log('statusCode:************************** ', statusCode);
                    console.log('body:=============> ', body);
                    res.send(body);

                });
    }

    router.post('/register',(req, res, next) => {
        console.log("within post ------------------------------------")
        var uniqueId = shortid.generate();
     //   var identificationno = uniqid();
        
                    fs.writeFile('angular-src/src/app/components/registertable/new.txt', uniqueId, 'utf-8', function (err) {

                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                     if (err) {
                         console.log("error writing /data/new.txt");
                     } else {
                        console.log("JSON file written to /data/new.txt");
                     }
                     });
        callBlockChain(req, res, uniqueId);
      //  res.send(uniqueId);
    });




 //console.log("starting======");
 //router.post('/register',(req, res) => { 
   //  console.log("option ====== > "+JSON.stringify(options)); 

     //request(options, function (err, res, body) {
	  //if (err) {
		//console.log('error posting json: ', err)
		//throw err
       // res.statusCode(500).send(err);
	  //}
		//var headers = res.headers
		//var statusCode = res.statusCode
		//console.log('headers++++++++++++++++++++++++++++++++++++++: ', headers)
		//console.log('statusCode>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: ', statusCode)
		//console.log('body: ', body)
	//}).pipe(res); 
  //});

//Register
//router.post('/register',(req, res, next) => {
   // res.send("REGISTER");
 //  let newUser = new User({
   //    name : req.body.name,
     //  email: req.body.email,
       //username: req.body.username,
       //password : req.body.password
   //});

   //User.addUser(options, (err, user) => {
     //  if(err){
       //    res.json({success : false, msg: 'Failed to register User'});
       //}else{
         //   res.json({success : true, msg: 'User registered'});
      // }
   //})

  // var message = { 
    //    app_id: "5eb5a37e-b458-11e3-ac11-000c2940e62c",
      //  contents: {"en": "English Message"},
    //    included_segments: ["All"]
   // };

//sendNotification(message);
//});

//Authenticate
router.post('/authenticate',(req, res, next) => {
  //  res.send("AUTHENTICATE");
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user){
          return res.json({success: false, msg:'User not found'});
      }
      User.comparePassword(password, user.password, (err, isMatch) =>{
         if(err) throw err;
         if(isMatch){
            const token  = jwt.sign(user, config.secret,{
                expiresIn:604800 // 1 week
            });

            res.json({
                success: true,
                token:'JWT'+token,
                user:{
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email:user.email
                }
            });
         }else{
              return res.json({success: false, msg:'Wrong Password'});
         }
      });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res, next) => {
    //res.send("PROFILE");
    res.json({user: req.user});
});

module.exports = router;