import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  inscription: User = {
    name: '',
    email: '',
    password: '',
  };
  error: any;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}
  onSubmit() {
    this.authService.inscription(this.inscription).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/connexion']);
      },
      error: (error: any) => {
        console.error("Une erreur s'est produite : ", error.error.error);
        this.error = error.error.error;
      },
    });
  }
}
