import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {Router} from '@angular/router' 
import { SimpleDropdownModule } from 'ng2-simple-dropdown';
import { Item } from 'ng2-simple-dropdown';
import {Http} from "@angular/http";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
 // id:String;
  title: String;
  gender: String;
  firstName: String;
  lastName: String;
  dob: String;
  email: String;
  phoneno:String;
  identification:String;
  identificationno:String;
  nationality:String;
  address:String;
  country: String;
  city: String;
  pincode:String;
  state:String;

  titles: string[] = ['Mr.', 'Miss', 'Mrs', 'Others'];
  genders:string[] = ['Male', 'Female', 'Others'];
  nationalities:string[] = ['Indian', 'Denmark','USA', 'England', 'Srilanka'];
  identifications: string[] = ['Adhar Card', 'Voter Id', 'Driving License'];

  uniqueId:String;
  
  constructor(
    private validateService: ValidateService, 
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
    private http: Http) { };
 //  constructor() { }

  ngOnInit() {
  }

 onRegisterSubmit(){
    const user = {
    //  id:this.id,
      title: this.title,
      gender:this.gender,
      firstName: this.firstName,
      lastName:this.lastName,
      dob:this.dob,
      email:this.email,
      phoneno:this.phoneno,
      identification:this.identification,
      identificationno:this.identificationno,
      nationality:this.nationality,
      country:this.country,
      address:this.address,
      city:this.city,
      pincode:this.pincode,
      state:this.state
    }

     //Required Fields
    // console.log("user.title>>>>>>>>>>>>>>>>>>>",user.id);
  //   console.log("user.title>>>>>>>>>>>>>>>>>>>",user.title);
  //   console.log("user.firstName>>>>>>>>>>>>>>>>>>>",user.firstName);
     console.log("user.lastName>>>>>>>>>>>>>>>>>>>",user.lastName);

      if(!this.validateService.validateRegister(user)){
    //    console.log("user.title>>>>>>>>>>>>>>>>>>>",user.title);
        this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
        return false;

      }

      //validate Email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout:3000});
      //  console.log('Please use a valid email');
        return false;
      }

  //    this.authService.registerUser(user).subscribe(data => {
  //        console.log("dataREGISTER>>>>>>>>>>>>>>>>>>>>>>>>>",data)
  //          this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout:30000});
  //          this.router.navigate(['/login']);
  //  });
    

    this.authService.registerUser(user).subscribe(user => {
        //if(data.success){
          console.log("dataREGISTER>>>>>>>>>>>>>>>>>>>>>>>>>",user)

         // this.http.get("app/components/registertable/new.txt")
         //   .subscribe((uniqueId)=> {
         //       setTimeout(()=> {
         //           uniqueId = uniqueId;
         //           console.log("uniqueId,,,,,,,,,,,,,,,,,,,,,,,,,,",uniqueId)
         //      }, 1000);
         //   });

            this.http.get('app/components/registertable/new.txt')
            .subscribe((res) => {
             //    this.uniqueId = res["_body"];
                 let body = res.text();
                 console.log("uniqueId,,,,,,,,,,,,,,,,,,,,,,,,,,",body)
                 alert(`Please keep this id for further reference - ${body}`);
            });
            

            

         //  readSingleFile("app/components/registertable/new.txt");


            this.flashMessage.show('Information details submitted successfully', {cssClass: 'alert-success', timeout:3000});
            this.router.navigate(['/register']);
      // }else{
        //   this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout:3000});
        //    this.router.navigate(['/register']);
      // }

    });
   
  } 
}
