import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userId!: number | null;
  user?: User;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId !== null) {
      this.authService.getUserById(this.userId).subscribe(
        (response: any) => {
          this.user = response.data.name;
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des informations de l'utilisateur.",
            error
          );
        }
      );
    }
  }

  deconnexion() {
    this.authService.clearUserId();
    this.authService.removeToken();
    this.router.navigate(['/connexion']);
  }
}
