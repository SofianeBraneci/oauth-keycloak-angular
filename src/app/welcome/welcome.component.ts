import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn : boolean = false;
  public userForm : FormGroup; 
  constructor(private readonly keycloak: KeycloakService) { 

    this.userForm = new FormGroup({
      "username": new FormControl("", ),
      "firstname": new FormControl(""),
      "lastname": new FormControl(""),
      "email": new FormControl("")
    })
  }

  async ngOnInit() {

    try {
      this.isLoggedIn = await this.keycloak.isLoggedIn();

      if(this.isLoggedIn){

        this.userProfile = await this.keycloak.loadUserProfile();
        let values = {
          "username" : this.userProfile.username,
          "firstname": this.userProfile.firstName,
          "lastname" : this.userProfile.lastName,
          "email" : this.userProfile.email
        }
        this.userForm?.patchValue(values)
        console.log(this.userProfile, values)
      }
    } catch (error) {
      console.error('sdfsf', error)
    }

  }

  logout(){
    this.keycloak.logout("http://localhost:4200/")
  }
}
