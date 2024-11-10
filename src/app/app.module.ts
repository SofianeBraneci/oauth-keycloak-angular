import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ReactiveFormsModule } from '@angular/forms';

function initializeKeycloak(keycloak: KeycloakService){
  return () =>
    keycloak.init({
      config: {
        url: 'http://sso.keycloak.local:8080',
        realm: 'org',
        clientId: 'angular-client-id'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
          checkLoginIframe: false,
      },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
      shouldAddToken: (request) => {
        const {url} = request;
        return url.includes("/api/")
      },
      bearerExcludedUrls: ['/assets', "/public"],
      loadUserProfileAtStartUp: true
    });
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    ReactiveFormsModule
  ],
  providers:[{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
