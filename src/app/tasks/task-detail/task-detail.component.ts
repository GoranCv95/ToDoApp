import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  id: number;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
         this.id = +params['id'];
         this.task = this.taskService.getTask(this.id);
      });
  }

  onModifyTask(){
     this.router.navigate(['modify'], {relativeTo: this.route})
  }

  onDeleteTask(){
    this.taskService.deleteTask(this.id);
    this.router.navigate(['/tasks']);
  }

}
