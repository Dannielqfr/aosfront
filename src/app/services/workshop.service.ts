import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult, TypePerson, TypeWorkshop } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  getWorkshops(): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HttpResult>(`http://127.0.0.1:3000/workshop/get`, { headers })
  }

  postWorkshop(workshop: TypeWorkshop): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<HttpResult>(`http://127.0.0.1:3000/workshop/post`, workshop, { headers })
  }

  putWorkshop(workshop: TypeWorkshop): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<HttpResult>(`http://127.0.0.1:3000/workshop/put/${workshop.idworkshop}`, workshop, { headers })
  }
}
