import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult, TypePerson } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http:HttpClient) { }

  getPeople():Observable<HttpResult>{
    return this.http.get<HttpResult>(`localhost:3000/person/get`)
  }

}
