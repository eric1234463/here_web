import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'angular2-social-login';

export interface Doctor {
    id: number;
    uid: String;
    photoURL?: String;
    displayName?: String;
    location: String;
    google_lng: number;
    google_lat: number;
};

export interface FacebookUser {
    email: String;
    uid: String;
    token: String;
    image: String;
};

@Injectable()
export class UserService {
    public user: Doctor;
    constructor(public http: HttpClient, public auth: AuthService) {

    }
    login(provider: string) {
        return new Promise((resolve, reject) => {
            this.auth.login(provider).subscribe(
                (user: FacebookUser) => {
                    this.http.post<Doctor>('https://herefyp.herokuapp.com/api/user/doctorLogin', {
                        uid: user.uid
                    }).subscribe(currentUser => {
                        window.localStorage.setItem('user', JSON.stringify(currentUser));
                        resolve(currentUser);
                    });
                }
            );
        });
    }
    logout() {
        window.localStorage.removeItem('user');
    }

    getUser() {
        return new Promise<Doctor>((resolve, reject) => {
            resolve(JSON.parse(window.localStorage.getItem('user')));
        });
    }
}
