import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {Post} from 'c:/abhijit/Personal/AndroidDevelopment/BlockChainGovtPortal/GovtPortalApp3/angular-src/src/app/components/registertable/post';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {tokenNotExpired} from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}
 
var users = [
  new User('abhi@ibm.com','1234'),
  new User('jeet@ibm.com','1234')
];


@Injectable()
export class AuthService {
  public loading = new Subject<{loading: boolean, hasError: boolean, hasMsg: string}>();

  authToken:any;
  user:any;

  constructor(private http:Http, private router:Router) {}

 // registerUser(user){
  //  let headers = new Headers();
  //  headers.append('Content-Type','application/json');
 //   return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
  //  .map(res => res.json());
 // }

  registerUser(user){
   //  this.requestInterceptor();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
    .map(res => {
      console.log("registerUser:::::::::::::::::::::::::::",res)
   //   this.responseInterceptor();
      res.json()
    });
  }

//  getDatatableRecords(){
//    return this.http.get('http://localhost:3000/datatable/getallrecords')
//    .map(res => {
//      console.log("getallrecords))))))))))))))))))))))))))))))))))))))))))))))))))",res)
//      res.json()
//    });
//  }

getDatatableRecords1():Promise<Post[]> {
   //  this.requestInterceptor();
        return this.http.get('http://localhost:3000/datatable/getallrecords')
        .toPromise()
        .then(this.extractData);
    }

 getDatatableRecords():Promise<Post[]> {
     //  this.requestInterceptor();
        return this.http.get('http://localhost:3000/datatable/getallrecords')
        .toPromise()
        .then(this.extractData)
    }

    private extractData(res:Response) {
        let body = res.json();
        console.log("bodyExtractData---------------------------",body)
      //  this.responseInterceptor();
        return body || [];
        
    }



//  updateCandidateDetails(item){
//    let headers = new Headers();
//    headers.append('Content-Type','application/json');
//    return this.http.post('http://localhost:3000/updateusers/update', item, {headers:headers})
//    .map(res => {
//      console.log("registerUser:::::::::::::::::::::::::::",res)
//      res.json()
//    });
//  }

   updateCandidateDetails(item){
  //  this.requestInterceptor();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/updateusers/update', item, {headers:headers})
    .map(res => {
      console.log("registerUser:::::::::::::::::::::::::::",res)
 //     this.responseInterceptor();
      res.json()
    });
  }

//*******************view of navepanel dynamically */

loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

loggedIn(){
  return tokenNotExpired();
}


  //******************For LOGIN and LOGOUT*********************** */

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['Login']);
  }
 
  login(user){
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      this.router.navigate(['/registertable']);      
      return true;
    }
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this.router.navigate(['Login']);
    }
  } 

   /**
   * Request interceptor.
   */
  private requestInterceptor(): void {
    console.log('Sending Request');
    // this.loaderService.showPreloader();
    this.loading.next({
      loading: true, hasError: false, hasMsg: ''
    });
  }

//private responseInterceptor(): void {
//    console.log('Request Complete');
    // this.loaderService.hidePreloader();
//  }

  private responseInterceptor(): void {
    this.loading.next({
      loading: false, hasError: false, hasMsg: ''
    });
  }


    

}
