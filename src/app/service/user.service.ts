import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Ad } from '../models/ad.model';

import { Lease} from '../models/lease.model'

import { TokenStorageService } from "./token-storage.service";
import { Identifiers } from '@angular/compiler';
import { Report } from '../models/report.model';



const headeroption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  leasingDetailsAdmin;

  setleasingDetailsAdmin(data){
    this.leasingDetailsAdmin = data;
  }
  getleasingDetailsAdmin(){
    return this.leasingDetailsAdmin;
  }
  

  constructor(private http : HttpClient , private toaster : ToastrService) {}

  getads(){
    return this.http.get('http://localhost:8080/advertisement/getconfrimad');
  }   //Home Component

  postAd(ad){
    console.log(ad)
    return this.http.post('http://localhost:8080/advertisement/postadd', ad);
  }   // Post Add By Sales Agent

  postReport(report:Report,id){
      console.log(id)
      return this.http.post('http://localhost:8080/advertisement/reportad/{1}', report);

  }

  getImage(id){
    return this.http.get('http://localhost:8080/advertisement/getimage/{id}');
  }

  getAllUsers(){
    return this.http.get('http://localhost:8080/user/getallusers');
  }
  getAddsByUser() : Observable<any>{
    return this.http.get('http://localhost:8080/advertisement/getAddsByCurrentUser');
  }

  getOneAd(id) : Observable<any>{
    return this.http.get('http://localhost:8080/advertisement/getAdById/' +id);
  }

  editProfile(editprofile){
    return this.http.put('http://localhost:8080/user/editprofile/' , editprofile);
  }
  changePassword(secData, pwd){
    return this.http.put('http://localhost:8080/user/changepassword/'+pwd , secData);
  }

  
  // remainAdCount(){
  //   return this.http.get('http://localhost:8080/advertisement/countpostedad');
  // }
  // remainpostAdCount(){
  //   return this.http.get('http://localhost:8080/advertisement/countremainad');
  // }
  getNewAds(){
    return this.http.get('http://localhost:8080/advertisement/getnewad');
  }

  acceptAd(id:number) {
   return this.http.put('http://localhost:8080/admin/confrim/' +id,{});
  }

  getConfiremedAds(){
    return this.http.get('http://localhost:8080/advertisement/getconfrimad');
  }

  showSuccess(msg){
    this.toaster.success(msg);
  }
  shoeErr(err){
    this.toaster.error(err);
  }

  changePhoto(image){
    return this.http.put('http://localhost:8080/user/changephoto', image);
  }

  getLeasingCompany(){
    return this.http.get('http://localhost:8080/admin/getalllcompany');
  }

  // getUser(): Observable<User[]> {
  //   return this.http.get<User[]>(this.serviceUrl);
  // }
  

  postLease(lease : Lease){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(lease);

    return this.http.post<Lease>('http://localhost:8080/postlease' , lease);

  }

  remainAdCount(){
    return this.http.get('http://localhost:8080/advertisement/countpostedad');
  }
  remainpostAdCount(){
    return this.http.get('http://localhost:8080/advertisement/countremainad');
  }

  getAgentDetails() : Observable<any> {
    return this.http.get('http://localhost:8080/admin/getallagents');
  }

}
