import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component'
import { LandmarkDetailsComponent } from './components/landmark-details/landmark-details.component'
import { LoginFormComponent } from './components/login-form/login-form.component'

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'landmarks/:id', component: LandmarkDetailsComponent }   ,
    { path: 'login', component: LoginFormComponent }, 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
