import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'fuse-login-2', templateUrl: './login-2.component.html', styleUrls: ['./login-2.component.scss'], animations: fuseAnimations
})
export class FuseLogin2Component implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;

    constructor(private fuseConfig: FuseConfigService, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, public router: Router, public snackBar: MatSnackBar) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none', toolbar: 'none', footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {}, password: {}
        };
    }

    login() {
        this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(success => {
            this.router.navigateByUrl('/qr');
        }, error => {
            this.snackBar.open('Login Error', 'Understand', {
                duration: 5000
            });
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]], password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
