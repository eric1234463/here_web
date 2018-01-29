import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService, Doctor } from "../../../services/user";
import { fuseAnimations } from "../../../core/animations";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
    public doctor: Doctor;
    constructor(public userService: UserService) {}

    async ngOnInit() {
        this.doctor = await this.userService.getUser();
    }
}
