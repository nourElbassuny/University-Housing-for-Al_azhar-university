import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../Classes/student/student';
import {Room} from '../../Classes/room/room';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {
  private url: string="http://localhost:8084/api/students";
  constructor(private httpClient: HttpClient,) { }


  getStudentsByRoomId(roomId:number):Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url+`/findStudentByRoom/${roomId}`)
  }

}
