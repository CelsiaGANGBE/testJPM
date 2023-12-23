import { Component } from '@angular/core';
import { User } from '../model';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  user: User = {
    email: '',
    password: '',
  };
  error: any;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // console.log(this.authService.isAuthenticated());
    
      if(this.authService.isAuthenticated()){
        this.router.navigate(['/accueil']);
      }
  }
  onSubmit() {
    this.authService.connexion(this.user).subscribe({
      next: (response) => {
        if (response.status) {
          this.authService.saveUserId(response.data.id);
          const ex = this.authService.getUserId();
          console.log('Apres stockage ' + ex);
          this.router.navigate(['/accueil']);
        }
      },
      error: (error: any) => {
        console.error("Une erreur s'est produite : ", error);
        this.error = error.error.error;
      },
    });
  }
}
