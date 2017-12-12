import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { CategoryService } from '../../../services/category-service';
import { ComponentsService } from '../../../services/components-service';
import { DataService } from '../../../services/data-service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  
    
    
    isActive = false;
    showMenu = '';

    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    addFeedClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public boardservice:BoardService,public categoryService:CategoryService,public componentsService:ComponentsService,public dataservice:DataService){
   

    }
    ngOnInit(){
        this.boardservice.getboards().then((result)=>{
                console.log(result);
                this.variab.boardupdated=result;
        })
        this.categoryService.getfrompouch().then((result)=>{
            this.variab.categoryupdated=result;
        });
    }
    routeto(category){
        
        this.router.navigate(['/feeds'],{ queryParams: { category } })

    }
    routetoboard(board){ 
        var boardfeeds:any=[];
        var feedstodisplay:any=[];
       

       this.dataservice.getboardfeeds(board).then(res=>{

              boardfeeds=res;
              feedstodisplay = boardfeeds.map(feed=>{
                  return feed.value;
              })
              this.componentsService.alert(board,feedstodisplay); 
  
     });
        this.router.navigate(['/boardfeeds'],{ queryParams: { board } });


    }
   
    
    
}
