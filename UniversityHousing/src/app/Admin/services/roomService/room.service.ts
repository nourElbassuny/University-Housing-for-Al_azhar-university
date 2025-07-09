import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../Classes/room/room';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
 private baseUrl: string=environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}api/admin/rooms`,{headers:environment.headers});
  }
  getNonFullRooms():Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}api/student/non-full-room`,{headers:environment.headers});
  }
  makeBooking(roomId:number):Observable<{message:string}> {
    return  this.http.post<{message:string}>(`${this.baseUrl}api/student/booking-room?roomId=${roomId}`,{},{headers:environment.headers});
  }

  public findStudentAssignment():Observable<{status:boolean}>{
    return this.http.get<{status:boolean}>(`${this.baseUrl}api/student/student-assignment`,{headers:environment.headers});
  }
}
