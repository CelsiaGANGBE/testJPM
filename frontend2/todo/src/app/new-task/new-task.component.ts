import { Component } from '@angular/core';
import { Task } from '../model';
import { TaskService } from '../_services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  task: Task = {
    name: '',
    description: '',
    created_at: new Date(),
    due_date: new Date(),
  };
  userId!: number | null;
  error: any;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }

  onSubmit() {
    if (this.userId !== null) {
      this.task.user_id = this.userId;
    }
    this.taskService.newTask(this.task).subscribe({
      next: (response: any) => {
        console.log(response);

        this.router.navigate(['/accueil']);
      },
      error: (error: any) => {
        console.error("Une erreur s'est produite : ", error.error.error);
        this.error = error.error.error;
      },
    });
  }
}
