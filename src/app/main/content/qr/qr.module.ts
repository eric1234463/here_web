import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { SharedModule } from '../../../core/modules/shared.module';
import { FuseSampleComponent } from './qr.component';

const routes = [
    {
        path     : 'qr',
        component: FuseSampleComponent
    }
];

@NgModule({
    declarations: [
        FuseSampleComponent
    ],
    imports     : [
        SharedModule,
        QRCodeModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class QrModule
{
}
