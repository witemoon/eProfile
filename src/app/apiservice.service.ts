import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
@Injectable()
export class EProfileService {
  //headers: HttpHeaders;
  headers: Headers;
  public employeeDetail : Observable<any>;
  url2: string;
  url :string;
  options: RequestOptions;
  constructor(private https: HttpClient,private http: Http){
    this.url = "http://172.16.107.83:9090/eprofile/api";  //Bhagya
    this.url2 = 'http://10.100.201.35:9090/eprofile/api';  //Hari

    // this.headers = new HttpHeaders();
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('uid', 'THANGAPRAKASH_A');

    this.headers = new Headers({ 'Content-Type': 'application/json', 'uid': 'kirankumar_m' });
    this.options = new RequestOptions({ headers: this.headers });
  }
  getAllSkills() {
    return this.http.get(this.url+'/skill/allSkills', this.options).map(this.extractData);
  }

  postAddCoreSkills(payload) {
    return this.http.post(this.url+'/skill/addCoreSkill',payload);
  }

  
  getEmployeeList(searchParams: any){
    return this.https.post(this.url+'/skill/getEmployyeSkills', searchParams);
  // return this.https.get(this.url2);
  }

  getEmployeeDetail(emplpayload: any){
   

    let body = JSON.stringify(emplpayload);
    return this.employeeDetail = this.http.post(this.url+'/landingpage/gotolanding',body,this.options).map(this.extractData);

  }

  postSkipCount(payload){
    let body = JSON.stringify(payload);
    return this.http.post(this.url +'/skill/insertSkipCount',body,this.options).map(this.extractData);
  }

  deleterOtherSkills(payload){
    let body = JSON.stringify(payload);
    return this.http.post(this.url +'/skill/deleteCoreSkill',body,this.options).map(this.extractData);
  }

  getSkipCount(id){
    return this.http.get(this.url +'/skill/getSkipCount?employeeId='+ id).map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    return body || {};
}
}

// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { AppComponent } from './app.component';
// // import { Iorganisation, Ihospital, Idepartment,ISpeciality, Isecretary, Idoctor, Delegation } from './admin';
// // import{AdminComponent} from './admin/admin.component';



// import 'rxjs/add/operator/toPromise';

// // Observable class extensions
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

// // Observable operators
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';


// @Injectable()
// export class APIservice {

//   hospitalList: any;
//   organisationsList: any;
//   core_skillid:any;

//   headers: Headers;
//   options: RequestOptions;

//   constructor(private http: Http) {
//     this.headers = new Headers({
//      'Content-Type': 'application/json',
//       'uid': 'THANGAPRAKASH_A',
//       // 'Accept': 'application/json:THANGAPRAKASH_A',
//     });
//     this.options = new RequestOptions({ headers: this.headers });
//   }


//   getAllSkillsData() {
//     //   let headers = new Headers();
//     //   headers.append('Content-Type', 'application/json');
//     //   headers.append('uid', 'THANGAPRAKASH_A');
//     //   let opts = new RequestOptions();
//     //   opts.headers = headers;
//     //   this.http.get("http://172.16.101.44:8080/eprofile/api/skill/allSkills", opts).subscribe(
//     //     res => console.log(res.json()),
//     //     msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
//     //   );
//     //  // return this.http.get(, headers).map(Response => Response);
//     //   }
//     var reqHeader = new Headers({'content-type' :'application/json', 'uid': 'THANGAPRAKASH_A',});
//     return this.http.get('http://172.16.108.178:8060/eprofile/api/skill/allSkills', {headers:reqHeader})
//       .map(this.extractData)
//       .catch(this.handleError);
//   }

//   //Services starts

//   createService(url: string, param: any): Observable<any> {

//     const body = JSON.stringify(param);

//     return this.http
//       .post(url, body, this.options)
//       .map(this.extractData)
//       .catch(this.handleError);
//   }


//   updateService(url: string, param: any): Observable<any> {
//     let body = JSON.stringify(param);
//     return this.http
//       .post(url, body, this.options)
//       .map(this.extractData)
//       .catch(this.handleError);
//   }

//   deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
//     return this.http
//       .delete(url + "/?" + key + "=" + val, this.options)
//       .map(this.extractData)
//       .catch(this.handleError);
//   }

//   private extractData(res: Response) {
//     const body = res.json();
//     // console.log(body);
//     return body || {};
//   }

//   private handleError(error: any) {
//     const errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//     //console.error(errMsg);
//     return Observable.throw(errMsg);
//   }

// }
