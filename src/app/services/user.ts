import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "angular2-social-login";
import { Doctor, FacebookUser, GoogleUser } from "./constant";
@Injectable()
export class UserService {
    public user: Doctor;
    constructor(public http: HttpClient, public auth: AuthService) {}
    async facebookLogin() {
        let user = await this.auth.login("facebook").toPromise();
        const facebookUser = user as FacebookUser;
        const currentUser = await this.http
            .post<Doctor>("https://herefyp.herokuapp.com/api/doctor/login", {
                uid: facebookUser.uid,
                email: facebookUser.email
            })
            .toPromise();
        window.localStorage.setItem("user", JSON.stringify(currentUser));
        return currentUser;
    }

    async googleLogin() {
        let user = await this.auth.login("google").toPromise();
        const googleUser = user as GoogleUser;
        const currentUser = await this.http
            .post<Doctor>("https://herefyp.herokuapp.com/api/doctor/login", {
                uid: googleUser.uid,
                email: googleUser.email
            })
            .toPromise();
        window.localStorage.setItem("uid", currentUser.id.toString());
        return currentUser;
    }

    async update(doctorId: number, form) {
        const currentUser = await this.http
            .put(`https://herefyp.herokuapp.com/api/doctor/${doctorId}`, {
                ...form
            })
            .toPromise();
        return currentUser;
    }
    logout() {
        window.localStorage.removeItem("uid");
    }

    async getUser() {
        const id = window.localStorage.getItem("uid");
        return await this.http
            .get<Doctor>(`https://herefyp.herokuapp.com/api/doctor/${id}`)
            .toPromise();
    }
}
