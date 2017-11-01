import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit{
    @Input() heading: string;
    @Input() icon: string;
checkedarticle:any=false;
checkedtitle:any=false;
checkedmagazine:any=false;
checkedcard:any=false;
loginForm;
fromdate = this.formBuilder.control('', [Validators.required]);
todate = this.formBuilder.control('', [Validators.required]);
 constructor(public formBuilder: FormBuilder,public datepipe: DatePipe,public router:Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      fromdate: this.fromdate,
      todate: this.todate

    });
  
  	
  }
  datefilter(){
    var changefrom,changeto;
     changefrom = this.datepipe.transform(this.fromdate.value, 'dd.MM.yyyy');
     changeto = this.datepipe.transform(this.todate.value, 'dd.MM.yyyy');
   
    }
  
   readlater(item){
  	console.log("called",item);
  

  }
  onChange(deviceValue) {
    console.log(deviceValue);
    if(deviceValue === 'Magazine') 
      { 
        console.log(deviceValue);
        this.router.navigate(['/magazineview'])
        this.checkedmagazine=true;
  }
  else if(deviceValue === 'Article') 
      { 
        console.log(deviceValue);
        this.router.navigate(['/articleview'])
        this.checkedarticle=true;
  }
  else if(deviceValue === 'Title') 
      { 
        console.log(deviceValue);
        this.router.navigate(['/title-view'])
  }
  else  
      { 
        console.log(deviceValue);
        this.router.navigate(['/card-view'])
  }
  
  
}

 


}
