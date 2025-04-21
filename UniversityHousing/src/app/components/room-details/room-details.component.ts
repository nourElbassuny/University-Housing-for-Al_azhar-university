import {Component, OnInit} from '@angular/core';
import {RoomDetailsService} from '../../services/roomDetailService/room-details.service';
import {Student} from '../../Classes/student/student';
import {NgForOf, NgIf} from '@angular/common';
import {ShareDataService} from '../../services/shareDataService/share-data.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-room-details',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './room-details.component.html',
  standalone: true,
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit {
  studentList: Student[] = [];
  BuildingName:string='';
  roomId:number=0;
  roomName:string='';
  storage:Storage=sessionStorage;
  constructor(private roomDetailsService: RoomDetailsService, private shareData: ShareDataService) {
  }

  ngOnInit() {
    this.getData();
    this.getStudentByRoomId(this.roomId);
  }

  getStudentByRoomId(roomId:number) {
    this.roomDetailsService.getStudentsByRoomId(roomId).subscribe(
      res => this.studentList = res,
      error => alert(error.message)
    )
  }

    getData(): void {
      const roomIdFromStorage = this.storage.getItem('roomId');
      const roomNameFromStorage = this.storage.getItem('roomName');
      const buildingNameFromStorage = this.storage.getItem('buildingName');

      if (roomIdFromStorage && roomNameFromStorage && buildingNameFromStorage) {
      this.roomId = +roomIdFromStorage;
      this.roomName = roomNameFromStorage;
      this.BuildingName = buildingNameFromStorage;
    } else {
      this.shareData.currentRoomId.subscribe(data => {
        this.roomId = data;
        this.storage.setItem('roomId', data.toString());
      });

      this.shareData.currentRoomNumber.subscribe(data => {
        this.roomName = data;
        this.storage.setItem('roomName', data);
      });

      this.shareData.currentBuildingName.subscribe(data => {
        this.BuildingName = data;
        this.storage.setItem('buildingName', data);
      });
    }
  }

  getStudentId(id: number | any) {
    this.shareData.setStudentId(id);
  }
}
