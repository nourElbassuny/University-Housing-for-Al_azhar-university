import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../Classes/room/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
 private url: string="http://localhost:8084/api/rooms";
  constructor(private http: HttpClient) { }

  public getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }
}
