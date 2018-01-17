import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { SharedModule } from '../../../core/modules/shared.module';
import { FuseSampleComponent } from './qr.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = { url: 'https://herefyp.herokuapp.com', options: {} };
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
        HttpClientModule,
        SocketIoModule.forRoot(config),
        RouterModule.forChild(routes)
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class QrModule
{
}
