import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseLogin2Component } from './login-2/login-2.component';
import { FuseRegister2Component } from './register-2/register-2.component';
import { FuseForgotPassword2Component } from './forgot-password-2/forgot-password-2.component';

const routes = [
    {
        path     : 'login',
        component: FuseLogin2Component
    },
    {
        path     : 'register',
        component: FuseRegister2Component
    },
    {
        path     : 'forgot-password',
        component: FuseForgotPassword2Component
    }
];

@NgModule({
    declarations: [
        FuseLogin2Component,
        FuseRegister2Component,
        FuseForgotPassword2Component,
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class AuthenticationModule
{

}
