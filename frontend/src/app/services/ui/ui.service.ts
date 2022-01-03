import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showLogoutText: boolean = false;
    private subject = new Subject<any>();

    constructor() { }

    toggleLoginBtnText(): void {
        const hasSession = sessionStorage.getItem('sessionToken') || '';
        this.showLogoutText = hasSession ? true : false;
        this.subject.next(this.showLogoutText);
    }

    onToggle(): Observable<any> {
        return this.subject.asObservable();
    }
}
