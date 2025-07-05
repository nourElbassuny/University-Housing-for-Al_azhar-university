import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../../Classes/student/student';
import {Employee} from '../../../Classes/employee/employee';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});

  constructor(private http: HttpClient) { }



  saveStudent(formData:FormData): Observable<{ message:string }> {
    console.log(localStorage.getItem('token'))
    return this.http.post<{ message:string }>(this.baseUrl + 'api/student/save', formData, { headers: this.headers });
  }
  getStudents(page:number,size:number): Observable<PaginatedStudentResponse> {
    console.log(localStorage.getItem('token'))
    const url=`${this.baseUrl}api/admin/all-students?page=${page}&size=${size}`;
    return this.http.get<PaginatedStudentResponse>(url,{
      headers:{
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
  getStudentsByUrl(url: string): Observable<PaginatedStudentResponse> {
    return this.http.get<PaginatedStudentResponse>(url);
  }



  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }
  getStudent(): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}api/student/getStudentData`,{headers:this.headers});
  }

  getStudentImage(): Observable<{image:string}> {
  return   this.http.get<{image:string}>(`${this.baseUrl}api/student/image`,{headers:this.headers});
  }

  getStudentImageByStudentId( id:number): Observable<string> {
    return   this.http.get<string>(`${this.baseUrl}api/student/image`,{headers:this.headers});
  }

  saveStudentAbsence(data:StudentAbsence):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}api/student/save/studentAbsence`,data,{headers:this.headers})
  }

  getCurrentStudentAbsence():Observable<StudentAbsence[]>{
    return this.http.get<StudentAbsence[]>(`${this.baseUrl}api/student/studentAbsences`,{headers:this.headers})
  }

  getStudentAbsenceById(studentId:number): Observable<StudentAbsence[]> {
    return this.http.get<StudentAbsence[]>(`${this.baseUrl}api/admin/studentAbsences?studentId=${studentId}`);
  }

}

export interface StudentAbsence{
  id?:number,
  startDate:string,
  endDate:string,
  reason:string
}

export interface PaginatedStudentResponse {
  content: Student[];
  currentPage: number;
  totalPage: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}
