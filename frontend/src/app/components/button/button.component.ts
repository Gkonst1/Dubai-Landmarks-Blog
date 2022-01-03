import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent implements OnInit {
    @Input() text: string  = '';
    @Input() color: string = '';
    @Output() btnClick     = new EventEmitter();

    constructor(private router: Router) {}

    ngOnInit(): void {
    }

    /**
     * The click action of the button
     */
    onClick() {
        const hasSession = sessionStorage.getItem('sessionToken');
        
        if (!hasSession) {
            localStorage.setItem('loginFrom', this.router.url);
        }
        this.btnClick.emit();
    }

}
