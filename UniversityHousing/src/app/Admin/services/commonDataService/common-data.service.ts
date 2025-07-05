import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Governorate} from '../../../Classes/governorate/governorate';
import {State} from '../../../Classes/states/state';
import {Colleague} from '../../../Classes/colleague/colleague';
import {Department} from '../../../Classes/department/department';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  private baseUrl: string = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {
  }

  getAllColleague():Observable<Colleague[]>{
    return this.http.get<Colleague[]>(`${this.baseUrl}api/auth/colleague`);
  }
  getDepartmentsByColleagueId(id:number):Observable<Department[]>{
    return this.http.get<Department[]>(`${this.baseUrl}api/auth/departmentsByColleagueId?colleagueId=${id}`);
  }

  getAllGovernorate(): Observable<Governorate[]> {
    return this.http.get<Governorate[]>(`${this.baseUrl}api/auth/governorate`);
  }
  getStatesByGovernorateId(id:number):Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}api/auth/statesByGovernorateId?governorateId=${id}`)
}
}
