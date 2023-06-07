import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { };
  getdata(){
    let url="http://localhost:3000/users";
    return this.http.get(url);
  }
  getdataById(id:any){
    let url="http://localhost:3000/getById/"+id;
    return this.http.get(url);
  }
  postdata(data:any){
    let url="http://localhost:3000/addUsers";
    return this.http.post(url,data);
  }
  delete(id:any){
    let url="http://localhost:3000/deleteUser/";
    let Id = {id:id};
    console.log('sssssssss',Id);    
    return this.http.put  (url,Id);
  }
  update(updateData:any){
    let url="http://localhost:3000/updateUser/";
    console.log('sssssssss',updateData);    
    return this.http.put  (url,updateData);
  }
}
