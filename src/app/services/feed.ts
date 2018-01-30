import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Feed } from "./constant";
import { UserService } from "./user";
@Injectable()
export class FeedService {
    constructor(public http: HttpClient, public userService: UserService) {}

    async getFeeds() {
        const currentUser = await this.userService.getUser();
        return await this.http
            .get<Feed[]>(
                `https://herefyp.herokuapp.com/api/feed?doctorId=${
                    currentUser.id
                }`
            )
            .toPromise();
    }

    async getFeedById(id) {
        return await this.http
            .get<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`)
            .toPromise();
    }

    async updateFeed(id: number, form) {
        const currentUser = await this.userService.getUser();
        return await this.http
            .put<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`, {
                content: form.content,
                title: form.title,
                doctorId: currentUser.id,
                photoURL: form.photoURL,
                id: id
            })
            .toPromise();
    }
    async createFeed(form) {
        const currentUser = await this.userService.getUser();
        return await this.http
            .post<Feed>(`https://herefyp.herokuapp.com/api/feed`, {
                content: form.content,
                title: form.title,
                doctorId: currentUser.id,
                photoURL: form.photoURL
            })
            .toPromise();
    }
}
