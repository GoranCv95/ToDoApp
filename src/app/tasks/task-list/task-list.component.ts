import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  subscription: Subscription;

  constructor(private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.taskService.tasksChanged
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    this.tasks = this.taskService.getTasks();
  }

  onNewTask(){
     this.router.navigate(['../add-task'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
