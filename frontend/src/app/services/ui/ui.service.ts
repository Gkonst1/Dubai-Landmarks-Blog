import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showLogoutText: boolean      = false;
    private showLoadingMessage: boolean  = false;
    private loginSubject: Subject<any>   = new Subject<any>();
    private loadingSubject: Subject<any> = new Subject<any>();

    constructor() { }

    toggleLoginBtnText(): void {
        const hasSession = sessionStorage.getItem('sessionToken') || '';
        this.showLogoutText = hasSession ? true : false;
        this.loginSubject.next(this.showLogoutText);
    }

    toggleLoadingMessage(shouldShowLoadingMessage: boolean): void {
        this.showLoadingMessage = shouldShowLoadingMessage;
        this.loadingSubject.next(this.showLoadingMessage);
    }

    onLoginButtonTextToggle(): Observable<any> {
        return this.loginSubject.asObservable();
    }

    onLoadingTextToggle(): Observable<any> {
        return this.loadingSubject.asObservable();
    }
}
