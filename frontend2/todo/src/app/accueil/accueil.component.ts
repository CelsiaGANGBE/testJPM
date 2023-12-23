import { Component } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Task } from '../model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  tasks: any;
  userId: number | null;
  filtered_tasks: any;
  statut: string = 'all';
  date_filtered_mode: string = 'date_creation';
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.getUserId();
  }
  ngOnInit(): void {
    this.alltask();
  }

  formateDate(str: string) {
    return (
      new Date(str).getFullYear() +
      '-' +
      new Date(str).getMonth() +
      '-' +
      new Date(str).getDate()
    );
  }

  alltask() {
    this.taskService.tasks(this.userId).subscribe(
      (data) => {
        this.tasks = data.data;
        this.filtered_tasks = this.tasks;
        console.log(this.tasks);
      },
      (error) => {}
    );
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('supprime');
        this.alltask();
      },
    });
  }

  goUpdateTask(taskId: number) {
    this.router.navigate(['/task'], { queryParams: { taskId } });
  }

  tri_date() {
    if (this.date_filtered_mode === 'date_creation') {
      this.filtered_tasks = this.filtered_tasks.sort((a: Task, b: Task) => {
        if (a.created_at === b.created_at) {
          return 0;
        }
        if (a.created_at > b.created_at) {
          return 1;
        }
        if (a.created_at < b.created_at) {
          return -1;
        }
        return undefined;
      });
    } else {
      this.filtered_tasks = this.filtered_tasks.sort((a: Task, b: Task) => {
        if (a.due_date === b.due_date) {
          return 0;
        }
        if (a.due_date > b.due_date) {
          return 1;
        }
        if (a.due_date < b.due_date) {
          return -1;
        }

        return undefined;
      });
    }

    console.log(this.tasks);
  }

  tri() {
    if (this.statut === 'all') {
      this.filtered_tasks = this.tasks;
    } else {
      this.filtered_tasks = this.tasks.filter(
        (elm: any) => elm.statut === this.statut
      );
    }

    console.log(this.tasks);
  }
}
