import {Component, OnInit} from '@angular/core';


import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Room} from '../../../../Classes/room/room';
import {RoomService} from '../../../services/roomService/room.service';
import {ShareDataService} from '../../../services/shareDataService/share-data.service';

@Component({
  selector: 'app-rooms-list',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './rooms-list.component.html',
  standalone: true,
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private roomService: RoomService,private shareDataService: ShareDataService) {
  }

  ngOnInit(): void {
    this.getAllRooms();
  }

  private getAllRooms() {
    this.roomService.getAllRooms().subscribe(
      res => this.rooms = res,
      error => alert(error.message())
    )
  }

  passingRoom(item: Room) {
    this.shareDataService.setRoomData(item.buildingName,item.roomNumber,item.id)
  }
}

