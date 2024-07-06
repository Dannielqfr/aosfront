import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAuthResult, TypePerson } from '../interfaces/types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(username: string, userpass: string): Observable<HttpAuthResult> {
        return this.http.post<HttpAuthResult>(`http://127.0.0.1:3000/auth/login`, { username, userpass })
    }

}