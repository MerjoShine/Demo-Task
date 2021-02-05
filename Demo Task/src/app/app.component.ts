import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements DoCheck {
    pageTitle = 'Demo Task';
    logoutTitle = 'Logout';
    user: string;
    userName: string;
    constructor(private _router: Router, private authenticationService: AuthenticationService) { }

    ngDoCheck(): void {
        this.authenticationService.currentUser.subscribe(user => this.userName = user?.userName)
        this.user = localStorage.getItem('User')
        if (this.user) {
            this.authenticationService.currentUser.subscribe(user => this.userName = user?.userName)
        }

    }

    //Event calls on clicking the logout
    logout() {
        this.authenticationService.logout()
        this._router.navigate(['/login']);
    }
}
