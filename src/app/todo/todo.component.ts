import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { iTask } from '../model/tasks';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  tasks : iTask [] = [];
  inprogress : iTask [] = [];
  done : iTask [] = [];
  i!:number
  updatedId : any;
  isEditEnabled : boolean = false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
       item:['',Validators.required]
    });
  }

  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }

  deleteTask(i: number){
   this.tasks.splice(i,1)
  }
  deleteInporgess(i: number){
    this.inprogress.splice(i,1)
   }
   deleteDone(i: number){
    this.done.splice(i,1)
   }
   onEdit(item:iTask,i:number){
      this.todoForm.controls['item'].setValue(item.description);
      this.updatedId = i;
      this.isEditEnabled = true;
   }
   updateTask(){
    this.tasks[this.updatedId].description = this.todoForm.value.item;
    this.tasks[this.updatedId].done = false;
    this.todoForm.reset();
    this.updatedId = undefined;
    this.isEditEnabled = false;
   }

  drop(event: CdkDragDrop<iTask[]>) {
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
