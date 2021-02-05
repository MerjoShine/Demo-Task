import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from '../login/Login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private UserSubject: BehaviorSubject<Login>;
    public currentUser: Observable<Login>;

    constructor(private http: HttpClient) {
        this.UserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('User')));
        this.currentUser = this.UserSubject.asObservable();
    }

    //Returns the current user value
    public get currentUserValue(): Login {
        return this.UserSubject.value;
    }

    //Store the user credentials
    login(user) {
        return this.http.get<any>(`http://localhost:3000/users`)
            .pipe(map(users => {
                localStorage.setItem('User', JSON.stringify(user));
                this.UserSubject.next(user);
                return user;
            }));
    }

    //Remove the user credentials
    logout() {
        localStorage.removeItem('User');
        this.UserSubject.next(null);
    }
}