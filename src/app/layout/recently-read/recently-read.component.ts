import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
@Component({
  selector: 'app-recently-read',
  templateUrl: './recently-read.component.html',
  styleUrls: ['./recently-read.component.scss'],
  animations: [routerTransition()]
})
export class RecentlyReadComponent implements OnInit {
feeds:any=[];                //variable to store feeds to display
metadata:any=[];             //variable to store metadata of feeds
view:any;                    //variable to store the view state
globalfeeds:any=[];          //variable to store feeds globally
date:any;                    //variable to store the state of dates to filters
user:any;
  constructor(public variab:Global,public dataservice:DataService) {
   }
   
   //On loading Component
  ngOnInit() {
    var doc:any=[];
    this.user = localStorage.getItem('name');
    //Fetch the data from service and store in global variable
  	this.dataservice.getrecentlyread(this.user).then(result=>{
                       //Set result to global variable as it can be accessed outdside the component
                       this.variab.recentlyread=result;
                  this.feedFromAnnotation();
     
    });
     

  }
  //Function to get feeds from annotations
  feedFromAnnotation(){
    this.feeds = this.variab.recentlyread.map(feed=>{
      return feed.value.target;
    });
    console.log("recentlyread",this.feeds)
  }

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view = childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){

    this.date = childDates;
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);

    this.feeds =  this.variab.recentlyread.filter((res)=>{
        
       if(fromdate<=Date.parse(res.value.target.value.date) && todate>=Date.parse(res.value.target.value.date)){
        //sconsole.log("date",res.value.target);
          return res;
        }
       

    });
    this.feeds = this.feeds.map(val=>{
      return val.value.target;
    })
  }
  //Function to handle Category event from page-header component
  public handleCategory(childCategory:any){

   this.feeds =  this.globalfeeds.filter((res)=>{
     console.log(childCategory,res.category);
       if(res.category === childCategory){
          return res;
        }

    });
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
   
    if(childSortLabel === 'Latest'){
    
     this.variab.recentlyread.sort(function(a, b) {
       
       return new Date(b.value.target.value.date).getTime() - new Date(a.value.target.value.date).getTime()
     });
     this.feedFromAnnotation();
    
    }
    if(childSortLabel === 'Oldest'){
      this.variab.recentlyread.sort(function(a, b) {
         
        return new Date(a.value.target.value.date).getTime() - new Date(b.value.target.value.date).getTime()
      });
      this.feedFromAnnotation();
     
    }
  }


}
