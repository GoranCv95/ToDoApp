import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../tasks/task.model';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnDestroy {
    tasks: Task[];
    private taskChangeSub: Subscription;

    constructor(private tasksService: TaskService){
    }
    
    ngOnInit(): void {
        this.tasks = this.tasksService.getTasks();
        this.taskChangeSub = this.tasksService.tasksChanged
        .subscribe((tasks: Task[]) => { 
            this.tasks = tasks;
        });
    }

    onEditItem(index: number){
        this.tasksService.startedEditing.next(index);
    }

    ngOnDestroy(): void {
        this.taskChangeSub.unsubscribe();
    }

}
