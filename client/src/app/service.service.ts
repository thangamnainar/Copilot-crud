import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { };
  getdata<T>(): Observable<T[]> {
    let url = "http://localhost:3000/users";
    return this.http.get<T[]>(url);
  }
  
  getdataById(id:string|null){
    let url="http://localhost:3000/getById/"+id;
    return this.http.get(url);
  }
  postdata<G>(data:G):Observable<G[]>{
    let url="http://localhost:3000/addUsers";
    return this.http.post<G[]>(url,data);
  }
  delete(id:number){
    let url="http://localhost:3000/deleteUser/";
    let Id = {id:id};
    console.log('sssssssss',Id);    
    return this.http.put(url,Id);
  }
  update<T>(updateData:T):Observable<T[]>{
    let url="http://localhost:3000/updateUser/";
    console.log('sssssssss',updateData);    
    return this.http.put<T[]>(url,updateData);
  }
}

export interface GetDataResponse {
  id: number,
  name: string,
  age: number,
  gender: string,
}
export interface PostDataResponse {
  name: string,
  age: number,
  gender: string,
}