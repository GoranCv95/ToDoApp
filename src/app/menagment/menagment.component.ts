import { Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task.model';


@Component({
  selector: 'app-menagment',
  templateUrl: './menagment.component.html',
  styleUrls: ['./menagment.component.css']
})
export class MenagmentComponent implements OnInit {
  
    todo: Task[] = [];
    doing: Task[] = [];
    done: Task[] = [];

  constructor(private taskService: TaskService){}
 
  ngOnInit(): void {
      this.todo = this.taskService.getTasks();
  }

  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
