import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../../Classes/student/student';
import {Employee} from '../../../Classes/employee/employee';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`})

  constructor(private http: HttpClient) { }



  saveStudent(formData:FormData): Observable<{ message:string }> {
    console.log(localStorage.getItem('token'))
    return this.http.post<{ message:string }>(this.baseUrl + 'api/student/save', formData, { headers: this.headers });
  }

  getStudents(): Observable<PaginatedStudentResponse> {
    console.log(localStorage.getItem('token'))
    const url=`${this.baseUrl}api/admin/all-students`;
    return this.http.get<PaginatedStudentResponse>(url,{
      headers:{
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getStudentActive(studentId:number): Observable<{ status:boolean }> {
    return this.http.get<{status:boolean}>(`${this.baseUrl}api/admin/get-student-active?studentId=${studentId}`,{headers:this.headers});
  }

  getFilteredStudents(filters: any,page:number): Observable<PaginatedStudentResponse> {
    console.log(filters.governorate)
    return this.http.get<PaginatedStudentResponse>(`${this.baseUrl}api/admin/get-students-withFilter?page=${page}&&colleague=${filters.college}&status=${filters.status}&governorate=${filters.governorate}&grade=${filters.grade}&search=${filters.search}`,
      {headers:this.headers});
  }

  changeStudentStatus(id:number,status:string):Observable<{status:string}> {
    return this.http.patch<{status:string}>(`${this.baseUrl}api/admin/change-student-status?studentId=${id}&status=${status}`,{},{headers:this.headers});
  }

  getStudentsByUrl(url: string): Observable<PaginatedStudentResponse> {
    return this.http.get<PaginatedStudentResponse>(url);
  }



  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}api/admin/getStudentById/${id}`,{headers:this.headers});
  }
  getStudent(): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}api/student/getStudentData`,{headers:this.headers});
  }

  getStudentImage(): Observable<{image:string}> {
  return   this.http.get<{image:string}>(`${this.baseUrl}api/student/image`,{headers:this.headers});
  }

  getStudentImageById(id:number): Observable<{image:string}> {
    return   this.http.get<{image:string}>(`${this.baseUrl}api/admin/student-image/${id}`,{headers:this.headers});
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

  getPresentStudents(date: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}api/admin/numberOf-present-student?date=${date}`,{headers:environment.headers});
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
