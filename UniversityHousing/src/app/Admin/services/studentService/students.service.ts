import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../../Classes/student/student';
import {Employee} from '../../../Classes/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
private baseUrl: string = 'http://localhost:8084/api/students';
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }
  getStudentImageByStudentId(id: number): Observable<string> {
  return   this.http.get<string>(`${this.baseUrl}/${id}/image`);
  }
}
