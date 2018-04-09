import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "../../../services/user";
import { Doctor } from "../../../services/constant";
import { fuseAnimations } from "../../../core/animations";
import { Router } from "@angular/router";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
    public doctor: Doctor;
    lat: number = 51.678418;
    lng: number = 7.809007;
    constructor(public userService: UserService, public router: Router) {}

    async ngOnInit() {
        const doctor = await this.userService.getUser();
        this.doctor = {
            ...doctor,
            google_lat: parseFloat(`${doctor.google_lat}`),
            google_lng: parseFloat(`${doctor.google_lng}`)
        }
    }

    goToEdit() {
        this.router.navigateByUrl("profile-edit");
    }
}
