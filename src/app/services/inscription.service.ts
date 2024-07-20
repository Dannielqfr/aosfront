import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult, TypeInscription } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  getInscriptions(): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HttpResult>(`http://127.0.0.1:3000/inscription/get`, { headers })
  }

  postInscription(inscription: TypeInscription): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<HttpResult>(`http://127.0.0.1:3000/inscription/post`, inscription, { headers })
  }

  putInscription(inscription: TypeInscription): Observable<HttpResult> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || "";
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<HttpResult>(`http://127.0.0.1:3000/inscription/put/${inscription.idinscription}`, inscription, { headers })
  }
}
