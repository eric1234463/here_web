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
                this.router.navigateByUrl("/home");
            }
        });
    }

    async googleLogin() {
        const user = await this.userService.googleLogin();
        if (user) {
            this.router.navigateByUrl("/home");
        }
    }

    async facebookLogin() {
        const user = await this.userService.facebookLogin();
        if (user) {
            this.router.navigateByUrl("/home");
        }
    }
}
