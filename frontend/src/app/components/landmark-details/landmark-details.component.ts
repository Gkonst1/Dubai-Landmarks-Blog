import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Landmark } from '../../interface/Landmark';
import { LandmarkService } from '../../services/landmark/landmark.service';
import { UserService } from '../../services/user/user.service';
import { UpdateLandmark } from '../../interface/UpdateLandmark';
import { UiService } from '../../services/ui/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-landmark-details',
    templateUrl: './landmark-details.component.html',
    styleUrls: ['./landmark-details.component.css']
})

export class LandmarkDetailsComponent implements OnInit {
    landmark?: Landmark;
    update!: UpdateLandmark;
    
    landmarkImage: string    = '';
    placeholder: string      = '';
    editBtnText: string      = 'Edit';
    saveBtnText: string      = 'Save';
    contentEditable: boolean = false;
    hasSession: string       = sessionStorage.getItem('sessionToken') || '';

    // The variables for the update of the textfields
    titleText: string        = '';
    shortInfoText: string    = '';
    descriptionText: string  = '';
    loadingText: string      = 'Updating..'
    showLoadingText?: boolean;
    subscription?: Subscription;

    constructor(
        private landmarkService: LandmarkService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private uiService: UiService) {
        this.subscription = this.uiService
            .onLoadingTextToggle()
            .subscribe((value) => {
                if (value) {
                    this.loadingText     = 'Updating..';
                    this.showLoadingText = value;       
                } else {
                    this.loadingText = 'Done!'
                    setTimeout(() => {
                        this.showLoadingText = value;               
                    }, 1500)
                }
            });
    }

    ngOnInit(): void {
        this.placeholder = '../../../assets/placeholder.gif';

        this.getTheLandmark();
    }


    /**
     * Calls the landmark service in order to get the landmark information from the database
     */
    getTheLandmark() {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.landmarkService.getOneLandmark(id).subscribe((landmark) => {
            if (!landmark.completed) {
                alert('Sorry, something went wrong. Please try again.')
            }
            this.landmark        = landmark.landmark;
            this.titleText       = landmark.landmark.title;
            this.shortInfoText   = landmark.landmark.short_info;
            this.descriptionText = landmark.landmark.description;
            this.landmarkImage   = landmark.landmark.photo?.url;
        });
    }

    /**
     * Opens the landmark photo full screen in a new tab
     * @param {string} url The url of the image.
     */
    goToLink(url?: string){
        if (url !== '../../../assets/placeholder.gif') {
            window.open(url, "_blank");
        }
    }

    toggleEditing() {
        this.contentEditable = !this.contentEditable;
        this.editBtnText = this.contentEditable ? 'Cancel' : 'Edit';
    }


    saveChanges() {        
        const update = {
            title: this.titleText,
            short_info: this.shortInfoText,
            description: this.descriptionText
        }

        this.landmarkService.updateLandmark(this.landmark?.objectId, update).subscribe(update => {
            this.uiService.toggleLoadingMessage(false);
            if (!update.completed) {
                // Logout the user if session is not valid
                if (update.message == 'Unauthorised access') {
                    this.userService.logout().subscribe(logout => {
                        if (!logout.completed) {
                            return alert(logout.message);
                        }

                        sessionStorage.removeItem('sessionToken');
                        this.uiService.toggleLoginBtnText();
                        this.router.navigateByUrl('/login');
                    })
                }
                return alert(update.message);
            }

            this.toggleEditing();
        })
    }


//Those methods get the edited text, when the edit mode is active
    
    onTitleChange(text: any) {
        this.titleText = text.innerHTML;
    }

    onShortInfoChange(text: any) {
        this.shortInfoText = text.innerHTML;
    }

    onDescriptionChange(text: any) {
        this.descriptionText= text.innerHTML;
    }
}
