import { Component } from '@angular/core';
import { TechSkillListComponent } from './tech-skill-list/tech-skill-list.component';
import { from } from 'rxjs/internal/observable/from';
import { EProfileService } from './apiservice.service';
import { empDetailsModel } from './models/empDetails.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eProfile';
  isauthanticate:any;
  errorMessage;
  empDetailslist:empDetailsModel[];
  loginDetails: any;

  constructor(private apiservice:EProfileService) { 
    
    // this.isauthanticate = {"isAuthenticate":true};
  }


  userName:any;

    ngOnInit() {
    this.userName = "kalpana_pr";
    this.isauthanticate = {"isAuthenticate":true};
 
    this.apiservice.getEmployeeDetail(this.isauthanticate).subscribe(
      result => {
        this.empDetailslist = result.loginDetail;
     //  console.log('test', this.empDetailslist);
      
        // for (var i = 0; i < this.empDetailslist.length; i++) {

        //  if(this.userName === this.empDetailslist.loginDetail[i].InsightId){
            
        //    var empinDetails = this.empDetailslist.loginDetail[i];
        //    // break;
        //  }
        // }
       
     
    },
    error => this.errorMessage = <any>error);



  
  }

}