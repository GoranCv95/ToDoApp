import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Task } from '../tasks/task.model';
import { TaskService } from '../tasks/task.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  storeTasks() {
    const tasks = this.taskService.getTasks();
    this.http
      .put(
        'https://ng-to-do-app-75be1-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        tasks
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchTasks() {
    return this.http
      .get<Task[]>(
        'https://ng-to-do-app-75be1-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
      )
      .pipe(
        map((tasks) => {
          return tasks.map((task) => {
            return {
              ...task,
            };
          });
        }),
        tap((tasks) => {
          this.taskService.setTasks(tasks);
        })
      );
  }
}
