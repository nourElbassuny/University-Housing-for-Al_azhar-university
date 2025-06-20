import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private userFullName = new BehaviorSubject<string>('');
  currentUserFullName = this.userFullName.asObservable();

  private isAuthenticated=new BehaviorSubject<boolean>(false);
  currentAuthenticated=this.isAuthenticated.asObservable();

  private buildingName = new BehaviorSubject<string>('');
  currentBuildingName = this.buildingName.asObservable();
  private roomNumber = new BehaviorSubject<string>('');
  currentRoomNumber = this.roomNumber.asObservable();
  private roomId = new BehaviorSubject<number>(0);
  currentRoomId = this.roomId.asObservable();



  private studentId = new BehaviorSubject<number>(0);
  currentStudentId = this.studentId.asObservable();
  constructor() { }



  changeStatus(authenticated:boolean){
    this.isAuthenticated.next(authenticated);
  }

  setRoomData(buildingName:string,roomNumber:string,roomId:number){
    this.buildingName.next(buildingName);
    this.roomNumber.next(roomNumber);
    this.roomId.next(roomId);
  }
  setStudentId(studentId:number){
    this.studentId.next(studentId);
  }

}
