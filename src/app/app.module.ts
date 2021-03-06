import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import "hammerjs";
import { SharedModule } from "./core/modules/shared.module";
import { AppComponent } from "./app.component";
import { FuseMainModule } from "./main/main.module";
import { FuseSplashScreenService } from "./core/services/splash-screen.service";
import { FuseConfigService } from "./core/services/config.service";
import { FuseNavigationService } from "./core/components/navigation/navigation.service";
import { AuthenticationModule } from "./main/content/authentication/authentication.module";
import { ErrorModule } from "./main/content/errors/error.module";
import { TranslateModule } from "@ngx-translate/core";
import { FuseError404Component } from "./main/content/errors/404/error-404.component";
import { FuseLogin2Component } from "./main/content/authentication/login-2/login-2.component";
import { Angular2SocialLoginModule } from "angular2-social-login";

const providers = {
    google: {
        clientId:
            "1069815185055-67h83nghemvan2tdqhe5hrqtc4sps3r8.apps.googleusercontent.com"
    }
};
const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: FuseLogin2Component
    },
    {
        path: "**",
        redirectTo: "404"
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        Angular2SocialLoginModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        AuthenticationModule,
        ErrorModule
    ],
    providers: [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
Angular2SocialLoginModule.loadProvidersScripts(providers);
