import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    
    console.log("user.firstName>>>>>>>>>>>>>>>>>>>",user.firstName);
    console.log("user.lastName>>>>>>>>>>>>>>>>>>>",user.lastName);

    if( user.title == undefined || user.gender == undefined || user.firstName == undefined || user.lastName == undefined || user.dob == undefined || user.email == undefined || user.phoneno == undefined || user.identification == undefined || 
       user.identificationno == undefined || user.nationality == undefined || user.address == undefined || user.country == undefined || user.city == undefined || user.pincode == undefined || user.state == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
