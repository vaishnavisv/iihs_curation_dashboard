import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';

@Component({
  selector: 'app-title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  animations: [routerTransition()]
})
export class TitleViewComponent implements OnInit {
feeds:any=[];


  constructor(public service:Service) { }

  ngOnInit() {
  this.service.getAll().then(result=>{
  	this.feeds= result;

});
  }

}
