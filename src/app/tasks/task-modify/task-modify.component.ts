import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-modify',
  templateUrl: './task-modify.component.html',
  styleUrls: ['./task-modify.component.css'],
})
export class TaskModifyComponent implements OnInit {
  id: number;
  modifyMode = false;
  taskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.modifyMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit(){
    if(this.modifyMode){
      this.taskService.updateTaskList(this.id, this.taskForm.value);
    } else {
      this.taskService.modifyTask(this.taskForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm() {
    let taskTitle = '';
    let taskDescription = '';
    let taskPerson = '';
    let taskDate = '';
    

    if (this.modifyMode) {
      const task = this.taskService.getTask(this.id);
      taskTitle = task.title;;
      taskDescription = task.description;
      taskPerson = task.person;
      taskDate = task.date;
    }

    this.taskForm = new FormGroup({
      'title': new FormControl(taskTitle, Validators.required),
      'description': new FormControl(taskDescription, Validators.required),
      'person': new FormControl(taskPerson, Validators.required),
      'date': new FormControl(taskDate, Validators.required)
    });
  }
}
