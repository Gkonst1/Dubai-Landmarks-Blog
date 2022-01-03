import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interface/User';
import { environment } from '../../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
    constructor(private http: HttpClient) { }


    login(username: string, password: string): Observable<any> {
        const user: User = { username, password };
        return this.http.post(`${environment.apiURL}/users/login`, user, httpOptions);
    }

    logout(): Observable<any> {
        return this.http.post(`${environment.apiURL}/users/logout`, {}, httpOptions);
    }
}
