import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult, TypePerson } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getPeople(): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<HttpResult>(`http://127.0.0.1:3000/person/get`, { headers })
  }

  postPeople(person: TypePerson): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<HttpResult>(`http://127.0.0.1:3000/person/post`, person, { headers })
  }
}
