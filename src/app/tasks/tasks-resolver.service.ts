import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Task } from "./task.model";
import { TaskService } from "./task.service";

@Injectable({providedIn: 'root'})
export class TasksResolverService implements Resolve<Task[]>{
    constructor(private dataStorageService: DataStorageService, private taskService: TaskService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Task[] | Observable<Task[]> | Promise<Task[]> {
        const tasks = this.taskService.getTasks();

        if(tasks.length === 0) {
            return this.dataStorageService.fetchTasks();
        } else {
            return tasks;
        }
    }
}