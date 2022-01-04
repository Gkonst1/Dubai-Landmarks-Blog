import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UiService } from '../../services/ui/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    title: string        = 'Dubai Landmarks';
    hasSession: string   = sessionStorage.getItem('sessionToken') || '';
    loginBtnText: string = this.hasSession ? 'Logout' : 'Login';
    showLogout?: boolean;
    subscription?: Subscription;

    constructor(
        private router: Router, 
        private userService: UserService,
        private uiService: UiService) {
        this.subscription = this.uiService
            .onLoginButtonTextToggle()
            .subscribe((value) => {
                this.showLogout   = value;
                this.loginBtnText = this.showLogout ? 'Logout' : 'Login';
            });
    }

    ngOnInit(): void {}


    /**
     * Hide the login button if we are in the login form, because we got the submit button there
     * @param {string} route The route of the page we see.
     */
    displayLoginBtn(route: string) {
        return this.router.url !== route;
    }


    /**
     * Navigate to the homepage when we click on the header title
     */
    goHome() {
        this.router.navigateByUrl('/');
    }


    /**
     * Login or logout the user
     */
    toggleLoginLogout() {
        this.hasSession = sessionStorage.getItem('sessionToken') || '';
        
        if (this.hasSession) {
            this.userService.logout().subscribe(logout => {
                if (!logout.completed) {
                    return alert(logout.message);
                }

                sessionStorage.removeItem('sessionToken');
                this.uiService.toggleLoginBtnText();
                this.router.navigateByUrl('/login');
            })
        } else {
            this.router.navigateByUrl('/login');
        }   
    }
}
