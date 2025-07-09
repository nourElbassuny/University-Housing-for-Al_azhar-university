import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../../Classes/student/student';
import {Room} from '../../../Classes/room/room';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {
  private url: string=environment.baseUrl;
  constructor(private httpClient: HttpClient,) { }


  getStudentsByRoomId(roomId:number):Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url+`api/admin/studentByRoomID?roomId=${roomId}`,{headers:environment.headers});
  }


}
