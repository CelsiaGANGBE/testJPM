import { Injectable } from '@angular/core';
import { User } from '../model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://127.0.0.1:8000/api`;
  private readonly USER_ID_KEY = 'user_id';
  token: any;

  constructor(private http: HttpClient) {
    this.isAuthenticated()
  }

  saveUserId(user_id: number) {
    localStorage.setItem('user_id', user_id.toString());
  }

  getUserId(): number | null {
    const userIdStr = localStorage.getItem('user_id');
    return userIdStr ? parseInt(userIdStr, 10) : null;
  }
  // Méthode pour récupérer un user par son ID
  getUserById(id: number) {
    this.token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.get(`${this.apiUrl}/users/${id}/`, httpOptions);
  }

  // Supprime l'`user_id` du local storage (appelé lors de la déconnexion)
  clearUserId(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }

  removeUserId() {
    localStorage.removeItem('user_id');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isAuthenticted(): boolean {
    if ( this.getToken() == null)
      return false
  else{
    this.token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),};
      const id = localStorage.getItem('user_id')
      this.http.get(`${this.apiUrl}/check-token`, httpOptions).pipe(
        tap({
          next: (response) => console.log('response affiche toi '+response),
          error: (err) => console.log(err),
        })
      )
      console.log('iciiiiiiiii');   
  }
  return true
  }

  isAuthenticated() {
    this.token = localStorage.getItem('token');
    if (this.token === null) {
      return false; 
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      };
       this.http.get(`${this.apiUrl}/check-token`, httpOptions)
        .pipe(
          tap({
            next: (response) => {
              console.log('Token valide : ', response);
              return true
            },
            error: (err:any) => {
              console.log('Erreur de vérification du token : ', err.error);
              return false
            },
          })
        )
        .toPromise()
        .then(() => true) 
        .catch(() => false); 
    }
    
    return true
  }

  inscription(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/inscription`, user)
      .pipe(
        tap({
          next: (response) => console.log(response),
          error: (err) => console.log(err),
        })
      )
      .pipe();
  }

  connexion(user: User) {
    return this.http.post<User>(`${this.apiUrl}/connexion`, user).pipe(
      tap((response: any) => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }

  isAuthentiated()
  {
    
    this.token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),};
       this.http.get(`${this.apiUrl}/check-token`,httpOptions).pipe(
        tap({
          next: (response) => console.log('oooooooooooo'+response),
          error: (err) => console.log('err'+err),
        })

      )
      if(this.http.get(`${this.apiUrl}/check-token`,httpOptions)){return true}
      return true
  }
}
