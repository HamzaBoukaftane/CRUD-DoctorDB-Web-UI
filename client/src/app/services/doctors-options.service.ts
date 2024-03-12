import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorsOptionsService {
  isAdd: boolean;
  isModify: boolean;
  isDelete: boolean;
  isDisplay: boolean;
  isConfirmingDelete: boolean = false;
  private confirmingDeleteSubject = new Subject<boolean>();
  confirmingDelete$ = this.confirmingDeleteSubject.asObservable();


  constructor(){}


  add() {
    this.isAdd = true;
    this.isModify = false;
    this.isDelete = false;
    this.isDisplay = false;
  }

  modify() {
    this.isAdd = false;
    this.isModify = true;
    this.isDelete = false;
    this.isDisplay = false;
  }

  delete() {
    this.isAdd = false;
    this.isModify = false;
    this.isDelete = true;
    this.isDisplay = false;
  }

  display() {
    this.isAdd = false;
    this.isModify = false;
    this.isDelete = false;
    this.isDisplay = true;
  }

  updateConfirmingDelete() {
    this.isConfirmingDelete = false;
    this.confirmingDeleteSubject.next(false);
  }
}
