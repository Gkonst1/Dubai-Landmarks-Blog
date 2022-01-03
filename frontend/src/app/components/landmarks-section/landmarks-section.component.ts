import { Component, OnInit } from '@angular/core';
import { Landmark } from '../../interface/Landmark';
import { LandmarkService } from '../../services/landmark/landmark.service';

@Component({
    selector: 'app-landmarks-section',
    templateUrl: './landmarks-section.component.html',
    styleUrls: ['./landmarks-section.component.css']
})

export class LandmarksSectionComponent implements OnInit {
    landmarks: Landmark[] = [];

    constructor(private landmarkService: LandmarkService) {}

    ngOnInit() {
        this.getLandmarks();
    }


    /**
     * Calls the landmark service in order to get the landmarks information from the backend
     */
    getLandmarks() {
        this.landmarkService.getLandmarks().subscribe((landmarks) => {
            if (!landmarks.completed) {
                alert('Sorry, something went wrong. Please try again.');
            }
            this.landmarks = landmarks.landmarks;
        });
    }
}
