import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FuseConfigService } from "../../../../core/services/config.service";
import { fuseAnimations } from "../../../../core/animations";
import { MatSnackBar } from "@angular/material";
import { UserService } from "../../../../services/user";

@Component({
    selector: "fuse-login-2",
    templateUrl: "./login-2.component.html",
    styleUrls: ["./login-2.component.scss"],
    animations: fuseAnimations
})
export class FuseLogin2Component {
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        public router: Router,
        public snackBar: MatSnackBar,
        public userService: UserService
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: "none",
                toolbar: "none",
                footer: "none"
            }
        });
        this.userService.getUser().then(user => {
            if (user !== null) {
                this.router.navigateByUrl("/qr");
            }
        });
    }

    googleLogin() {
        this.userService.googleLogin().then(user => {
            this.router.navigateByUrl("/qr");
        });
    }

    facebookLogin() {
        this.userService.facebookLogin().then(user => {
            this.router.navigateByUrl("/qr");
        });
    }

    // ngOnInit() {
    //     this.loginForm = this.formBuilder.group({
    //         email: ['', [Validators.required, Validators.email]], password: ['', Validators.required]
    //     });

    //     this.loginForm.valueChanges.subscribe(() => {
    //         this.onLoginFormValuesChanged();
    //     });
    // }

    // onLoginFormValuesChanged() {
    //     for (const field in this.loginFormErrors) {
    //         if (!this.loginFormErrors.hasOwnProperty(field)) {
    //             continue;
    //         }

    //         // Clear previous errors
    //         this.loginFormErrors[field] = {};

    //         // Get the control
    //         const control = this.loginForm.get(field);

    //         if (control && control.dirty && !control.valid) {
    //             this.loginFormErrors[field] = control.errors;
    //         }
    //     }
    // }
}
