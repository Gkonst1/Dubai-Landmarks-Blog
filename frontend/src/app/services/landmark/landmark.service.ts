import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Landmark } from '../../interface/Landmark';
import { environment } from '../../../environments/environment';
import { UiService } from '../ui/ui.service';


@Injectable({
    providedIn: 'root'
})

export class LandmarkService {

    constructor(private http: HttpClient,
                private uiService: UiService) { }

    getLandmarks(): Observable<any> {
        return this.http.get(`${environment.apiURL}/landmarks`);
    }

    getOneLandmark(id?: string): Observable<any> {
        return this.http.get(`${environment.apiURL}/landmarks/${id}`);
    }

    updateLandmark(id?: string, body?: Object): Observable<any> {
        const session = sessionStorage.getItem('sessionToken') || '';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Session-Token': session
            })
        }
        this.uiService.toggleLoadingMessage(true);
        return this.http.patch(`${environment.apiURL}/landmarks/${id}`, body, httpOptions);
    }
}
