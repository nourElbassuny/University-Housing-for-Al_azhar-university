import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Student} from '../../../../Classes/student/student';
import {RoomDetailsService} from '../../../services/roomDetailService/room-details.service';
import {ShareDataService} from '../../../services/shareDataService/share-data.service';

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
  roomName:number=0;
  constructor(private roomDetailsService: RoomDetailsService, private shareData: ShareDataService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.roomId=Number(this.route.snapshot.params['id']);
    this.roomName=(this.route.snapshot.params['roomNumber']);
    this.BuildingName=String(this.route.snapshot.params['buildingName']);
    this.getStudentByRoomId(this.roomId);
    console.log(this.studentList)
  }

  getStudentByRoomId(roomId:number) {
    console.log(roomId);
    this.roomDetailsService.getStudentsByRoomId(roomId).subscribe(
      res => this.studentList = res,
      error => alert(error.message)
    )
  }


}
