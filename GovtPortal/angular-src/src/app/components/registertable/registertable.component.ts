import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {AuthService} from '../../services/auth.service';
import {Post} from './post';
import { ViewChild } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-2-data-table';
import {Router} from '@angular/router' ;
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-registertable',
  templateUrl: './registertable.component.html',
  styleUrls: ['./registertable.component.css']
})


//export class RegistertableComponent implements OnInit {
export class RegistertableComponent {
  //  public loading = new Subject<{loading: boolean, hasError: boolean, hasMsg: string}>();
    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

    registerDataList:any; 
    
    private posts:Post[] = [];
    private errorMessage:any = '';
    
    films = [];
    peopleInfo = [];
    filmCount = 0;
    itemCount = 0;
    

    @ViewChild(DataTable) filmsTable;

    constructor(
        private authService:AuthService,
        private http: Http,
        private router: Router) {
       this.rowColors = this.rowColors.bind(this);
 //      this.filmsTable.count().then(count => this.itemCount = count);
    }

  
//    reloadDatatable(params) {
      //  this.filmResource.query(params).then(films => this.films = films);
//        this.authService.getDatatableRecords().subscribe()
//           this.http.get("app/components/registertable/people.json")
//            .subscribe(abc=> {
//                setTimeout(()=> {
//                    this.peopleInfo = abc.json();
//                    console.log("this.peopleInfo,,,,,,,,,,,,,,,,,,,,,,",this.peopleInfo)
//               }, 1000);
//            }); 
//    }

    reloadDatatable(params) {
      //  this.filmResource.query(params).then(films => this.films = films);
   //   this.requestInterceptor();
        this.authService.getDatatableRecords().then(
            posts => {
                this.posts = posts 
                console.log("this.postslllllllllllllllll",this.posts)
       //         this.responseInterceptor();
              //   var filmResource = new DataTableResource(posts); 
              //   if(filmResource.count)
          //      filmResource.count().then(count => 
          //      {
          //          this.filmCount = count
          //      });
               
            }); 
    }

 //   accept(item) {
 //       console.log("item..........................",item)
 //       this.authService.updateCandidateDetails(item).subscribe()
 //        this.http.get("app/components/registertable/people.json")
 //           .subscribe((films)=> {
 //               setTimeout(()=> {
 //                   this.films = films.json();
                  //  alert("Successfully Approved"); 
  //                 this.router.navigate(['/registertable']);
  //                  alert(`Successfully Identifation No generated - ${item.uniqueIdNumber}`);
  //             }, 1000);
  //          }); 
  //  }

     accept(item) {
        console.log("item..........................",item)
        this.authService.updateCandidateDetails(item).subscribe()
     //   this.router.navigate(['/registertable']); 
       
        this.authService.getDatatableRecords1().then(
            posts => {
                setTimeout(()=> {
                this.posts = posts
                console.log("this.postslllllllllllllllll",this.posts)
               
                alert(`Approved!!!!!!!!!!!!!!!`);
            //    this.router.navigateByUrl('/registertable');
                },1000);
            }); 
    }

   // cellColor(car) {
    //    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7)/1.3)*100)) + ')';
    //};

    rowColors(post) {
        if (post.verifyStatus == "true") return 'rgb(160, 250, 172)';
    }

    // special params:

     /**
   * Request interceptor.
   */
  

    translations = <DataTableTranslations>{
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'
    };

}
