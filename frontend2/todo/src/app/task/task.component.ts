import { Component } from '@angular/core';
import { Task } from '../model';
import { TaskService } from '../_services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  task: Task = {
    name: '',
    description: '',
    created_at: new Date(),
    due_date: new Date(),
  };
  taskId!: number;
  statuts = ['to_do', 'in_progress', 'finished'];
  error: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getTask();
  }

  mapStatutValue(value: any): string {
    switch (value) {
      case 'to_do':
        return 'A faire';
      case 'in_progress':
        return 'En cours';
      case 'finished':
        return 'Terminer';
      default:
        return '';
    }
  }
  getTask() {
    let id = this.route.snapshot.queryParamMap.get('taskId');
    if (id !== null) {
      this.taskId = +id;
    }
    console.log(id);

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (response: any) => {
        this.task = response.data;
        console.log(response);
      },
    });
  }

  updateTask() {
    this.taskService.updateTask(this.task).subscribe({
      next: (response) => {
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
