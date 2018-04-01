import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../core/modules/shared.module";
import { FuseMainComponent } from "./main.component";
import { FuseContentComponent } from "./content/content.component";
import { FuseFooterComponent } from "./footer/footer.component";
import { FuseNavbarVerticalComponent } from "./navbar/vertical/navbar-vertical.component";
import { FuseToolbarComponent } from "./toolbar/toolbar.component";
import { FuseNavigationModule } from "../core/components/navigation/navigation.module";
import { FuseNavbarVerticalToggleDirective } from "./navbar/vertical/navbar-vertical-toggle.directive";
import { FuseNavbarHorizontalComponent } from "./navbar/horizontal/navbar-horizontal.component";
import { FuseQuickPanelComponent } from "./quick-panel/quick-panel.component";
import { FuseThemeOptionsComponent } from "../core/components/theme-options/theme-options.component";
import { FuseShortcutsModule } from "../core/components/shortcuts/shortcuts.module";
import { FuseSearchBarModule } from "../core/components/search-bar/search-bar.module";
import { UserService } from "../services/user";
import { FeedService } from "../services/feed";
import { RecordService } from "../services/record";

import { QRCodeModule } from "angular2-qrcode";
import { SocketIoModule, SocketIoConfig } from "ng-socket-io";

import { NavHeaderComponent } from "./navHeader/nav.component";

import { StaticsComponent } from "./content/statics/statics.component";
import { FuseSampleComponent } from "./content/qr/qr.component";
import { ProfileComponent } from "./content/profile/profile.component";
import { ProfileEditComponent } from "./content/profile-edit/profile-edit.component";
import { FeedComponent } from "./content/feed/feed.component";
import { FeedEditComponent } from "./content/feed-edit/feed-edit.component";
import { QrAddComponent } from "./content/qr-add/qr-add.component";

const config: SocketIoConfig = {
    url: "https://herefyp.herokuapp.com",
    options: {}
};
const routes = [
    {
        path: "home",
        component: StaticsComponent
    },
    {
        path: "qr",
        component: FuseSampleComponent
    },
    {
        path: "qr/:id",
        component: QrAddComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "profile-edit",
        component: ProfileEditComponent
    },
    {
        path: "feeds",
        component: FeedComponent
    },
    {
        path: "feed/:id",
        component: FeedEditComponent
    },
    {
        path: "feed",
        component: FeedEditComponent
    }
];

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent,
        StaticsComponent,
        FuseSampleComponent,
        ProfileComponent,
        ProfileEditComponent,
        FeedComponent,
        NavHeaderComponent,
        FeedEditComponent,
        QrAddComponent
    ],
    imports: [
        SharedModule,
        QRCodeModule,
        SocketIoModule.forRoot(config),
        RouterModule.forChild(routes),
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule
    ],
    exports: [FuseMainComponent],
    providers: [UserService, FeedService, RecordService]
})
export class FuseMainModule {}
