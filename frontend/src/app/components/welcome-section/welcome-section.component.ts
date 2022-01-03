import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-welcome-section',
    templateUrl: './welcome-section.component.html',
    styleUrls: ['./welcome-section.component.css']
})
export class WelcomeSectionComponent implements OnInit {
    title: string = 'Welcome to Dubai';
    text: string  = 'Once a small fishing village in the Arabian Gulf, Dubai is today one of the most cosmopolitan cities in the world. One of the seven emirates that make up the United Arab Emirates, Dubai is home to nearly 200 nationalities and offers a truly memorable experience to all visitors. Whether it is by the banks of the Creek, or at the top of the Burj Khalifa, the world’s tallest building, Dubai lives and breathes a sense of possibility and innovation. And with an unparalleled coastline, beautiful desert and magnificent cityscapes, memories are just waiting to be made here.';

    constructor() { }

    ngOnInit(): void {
    }

}
