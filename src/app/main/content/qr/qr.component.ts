import { Component } from "@angular/core";
import { FuseTranslationLoaderService } from "../../../core/services/translation-loader.service";
import { Observable } from "rxjs/Observable";
import { Socket } from "ng-socket-io";
import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../../services/user";
import { Doctor, Record } from "../../../services/constant";

@Component({
    selector: "fuse-sample",
    templateUrl: "./qr.component.html",
    styleUrls: ["./qr.component.scss"]
})
export class FuseSampleComponent {
    public connection: Boolean = false;
    public loadingIndicator = true;
    public records: Record[];
    public uid: String;
    constructor(
        private translationLoader: FuseTranslationLoaderService,
        public socket: Socket,
        public http: HttpClient,
        public userService: UserService
    ) {
        this.userService.getUser().then(user => {
            this.uid = user.uid;
            this.socket.connect();
            this.socket.emit("subscribe", user.uid);
            this.translationLoader.loadTranslations(english, turkish);
            new Promise((resolve, reject) => {
                this.socket.on("cancel doctor", function(data) {
                    resolve();
                });
            }).then(() => {
                this.connection = false;
            });
            new Promise((resolve, reject) => {
                this.socket.on("connect doctor", function(data) {
                    const patient: String = data.patient;
                    resolve(patient);
                });
            }).then(patient => {
                this.http
                    .get<Record[]>(
                        `https://herefyp.herokuapp.com/api/record?userId=${patient}`
                    )
                    .subscribe(records => {
                        this.connection = true;
                        this.records = records;
                        this.loadingIndicator = false;
                    });
            });
        });
    }
}
