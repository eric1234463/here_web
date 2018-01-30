import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService, Doctor } from "../../../services/user";
import { fuseAnimations } from "../../../core/animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-profile-edit",
    templateUrl: "./profile-edit.component.html",
    styleUrls: ["./profile-edit.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileEditComponent implements OnInit {
    public doctor: Doctor;
    public form: FormGroup;
    public formErrors: any;

    constructor(
        public userService: UserService,
        public formBuilder: FormBuilder,
        public router: Router
    ) {}
    async ngOnInit() {
        this.doctor = await this.userService.getUser();
        this.form = this.formBuilder.group({
            displayName: ["", Validators.compose([Validators.required])],
            age: ["", Validators.compose([Validators.required])],
            about: ["", Validators.compose([Validators.required])],
            telphone: [
                "",
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ])
            ],
            location: ["", Validators.compose([Validators.required])],
            gender: ["", Validators.compose([Validators.required])]
        });
        this.form.setValue({
            displayName: this.doctor.displayName,
            age: this.doctor.age,
            about: this.doctor.about,
            telphone: this.doctor.telphone,
            location: this.doctor.location,
            gender: this.doctor.gender
        });
    }

    async update() {
        const currentUser = await this.userService.update(
            this.doctor.id,
            this.form.value
        );
        if (currentUser) {
            this.router.navigateByUrl("/profile");
        }
    }
}
