import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from './Login';
import { LoginService } from './login.service';
import { AuthenticationService } from '../services/authentication.service'

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    login = new Login();
    users: any[];
    valid = true;

    constructor(private router: Router, private loginService: LoginService, private authenticationService: AuthenticationService) {
        this.loginService.getUsers()
            .subscribe(users => this.users = users);
    }

    ngOnInit() {
        localStorage.removeItem('User');
    }

    //On submitting the Login form
    onSubmit() {
        this.valid = true;
        const name = this.login.userName;
        const password = this.login.password;
        const user = this.users.filter(currUser => currUser.userName === name && currUser.password === password)[0];
        if (user) {
            this.authenticationService.login(user).subscribe(user => {
                return this.router.navigate(['/success']);
            })

        } else {
            this.valid = false;
        }
    }
}

