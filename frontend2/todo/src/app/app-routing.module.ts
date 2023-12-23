import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  
  { path: 'inscription', component: InscriptionComponent },
  { path: '', component: ConnexionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent,canActivate: [AuthGuard] },
  { path: 'add', component: NewTaskComponent ,canActivate: [AuthGuard]},
  { path: 'nav', component: NavbarComponent },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
