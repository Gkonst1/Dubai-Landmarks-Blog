import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user/user.service';
import { UiService } from '../../services/ui/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
    username: string            = '';
    password: string            = '';
    error: string               = '';
    shouldDisplayError: boolean = false;
    passowrdIcon                = faEye;
    shouldShowPassword: boolean = false;

    constructor(
        private userService: UserService, 
        private router: Router,
        private uiService: UiService) { }

    ngOnInit(): void {
    }

    /**
     * Toggles the type of the password field between text and password and sets the right icon each time
     */
    toggleVisibility() {
        this.shouldShowPassword = !this.shouldShowPassword;
        this.passowrdIcon       = this.shouldShowPassword ? faEyeSlash : faEye;
    }

    /**
     * The action of the login form
     */
    onSubmit() {
        this.error = '';
        this.shouldDisplayError = false;

        if (!this.username || !this.password) {
            this.error = "Please fill the necessary fields!";
            this.shouldDisplayError = true;
            return;
        }

        this.userService.login(this.username, this.password).subscribe(login => {
                if (!login.completed) {
                    this.error = login.message;
                    this.shouldDisplayError = true;
                    return;
                }

                sessionStorage.setItem('sessionToken', login.user.sessionToken);
                const returnTo = localStorage.getItem('loginFrom') || '/';
                localStorage.removeItem('loginFrom');
                this.uiService.toggleLoginBtnText();
                this.router.navigateByUrl(returnTo);
            })
    }
}
