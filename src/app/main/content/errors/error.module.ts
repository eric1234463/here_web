import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseError404Component } from './404/error-404.component';
import { FuseError500Component } from './500/error-500.component';

const routes = [
    {
        path: '404',
        component: FuseError404Component
    },
    {
        path: '500',
        component: FuseError500Component
    }
];

@NgModule({
    declarations: [
        FuseError404Component,
        FuseError500Component
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class ErrorModule {

}
