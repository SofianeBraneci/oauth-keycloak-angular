import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = 
[
  {
    path : "",
    component : MainComponent,
    pathMatch : "full"
  },
  {
    path : "welcome",
    component: WelcomeComponent,
    pathMatch: "full",
      data : {
    roles: ["app.read"]
  },
  canActivate: [AccessGuard]
  },
  {
    path:"**",
    redirectTo: "/"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
