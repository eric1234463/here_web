import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "angular2-social-login";

export interface Doctor {
    id: number;
    uid: String;
    photoURL?: String;
    displayName?: String;
    location: String;
    google_lng: number;
    google_lat: number;
}

export interface FacebookUser {
    email: String;
    uid: String;
    token: String;
    image: String;
}

export interface GoogleUser {
    email: String;
    uid: String;
    name: String;
    image: String;
}

@Injectable()
export class UserService {
    public user: Doctor;
    constructor(public http: HttpClient, public auth: AuthService) {}
    facebookLogin() {
        return new Promise((resolve, reject) => {
            this.auth.login("facebook").subscribe((user: FacebookUser) => {
                this.http
                    .post<Doctor>(
                        "https://herefyp.herokuapp.com/api/doctor/login",
                        {
                            uid: user.uid,
                            email: user.email
                        }
                    )
                    .subscribe(currentUser => {
                        window.localStorage.setItem(
                            "user",
                            JSON.stringify(currentUser)
                        );
                        resolve(currentUser);
                    });
            });
        });
    }

    googleLogin() {
        return new Promise((resolve, reject) => {
            this.auth.login("google").subscribe((user: GoogleUser) => {
                this.http
                    .post<Doctor>(
                        "https://herefyp.herokuapp.com/api/doctor/login",
                        {
                            uid: user.uid,
                            email: user.email
                        }
                    )
                    .subscribe(currentUser => {
                        window.localStorage.setItem(
                            "user",
                            JSON.stringify(currentUser)
                        );
                        resolve(currentUser);
                    });
            });
        });
    }
    logout() {
        window.localStorage.removeItem("user");
    }

    getUser() {
        return new Promise<Doctor>((resolve, reject) => {
            resolve(JSON.parse(window.localStorage.getItem("user")));
        });
    }
}
