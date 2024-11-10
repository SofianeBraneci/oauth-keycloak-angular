import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private readonly keycloak: KeycloakService, private readonly router: Router){}

  async loging(){
    try {
      let isAleadyLogged = await this.keycloak.isLoggedIn();
      if(isAleadyLogged){
          this.router.navigate(["/welcome"])
      } else {
        await this.keycloak.login()
        this.router.navigate(["/welcome"])
      }

    } catch (error) {
      alert("An error occurred while authenticating")
    }
  }
}
