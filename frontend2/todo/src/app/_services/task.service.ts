import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `http://127.0.0.1:8000/api`;
  token: any;
  userId!: number | null;
  error:any

  constructor(private http: HttpClient, private route:Router) {}

  //tasks of someone
  tasks(userId: number | null) {
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.get<any>(
      `${this.apiUrl}/user/${userId}/tasks`,
      httpOptions
    );
  }

  newTask(task: Task): Observable<Task> {
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    console.log(this.token);
    return this.http
      .post<Task>(`${this.apiUrl}/tasks`, task, httpOptions)
      .pipe(
        tap({
          next: (response) => console.log(response),
          error: (err) => {console.log(err);this.error=err.ok;
            
            console.log(this.error);
          },
        })
      )
  }
  // Méthode pour récupérer une task par son ID
  getTaskById(id: number): Observable<Task> {
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`, httpOptions).pipe(
      tap({
        next: (response) => console.log(response),
        error: (err) => {console.log(err);this.error=err.ok;
          if(this.error == false){
            this.route.navigate(['/connexion']);
          }
          console.log(this.error);
        },
      })
    )
  }

  // Méthode pour mettre à jour une task existante
  updateTask(task: Task): Observable<Task> {
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.put<Task>(
      `${this.apiUrl}/tasks/${task.id}`,
      task,
      httpOptions
    ).pipe(
      tap({
        next: (response) => console.log(response),
        error: (err) => {console.log(err);this.error=err.ok;
  
          console.log(this.error);
        },
      })
    )
  }

  // Méthode pour supprimer une task par son ID
  deleteTask(id: number): Observable<any> {
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, httpOptions).pipe(
      tap({
        next: (response) => console.log(response),
        error: (err) => {console.log(err);this.error=err.ok;
          
          console.log(this.error);
        },
      })
    );
  }
}
