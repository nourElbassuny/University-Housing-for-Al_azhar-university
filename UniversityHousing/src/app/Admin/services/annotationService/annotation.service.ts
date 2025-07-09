import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private baseUrl:string=environment.baseUrl;
  private header=new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});

  constructor(private http: HttpClient) { }

  addNewAnnotation(annotation:Annotation):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}api/admin/save/annotation`, annotation, {headers: this.header});
  }
  getAllAnnotations():Observable<Annotation[]>{
    return this.http.get<Annotation[]>(`${this.baseUrl}api/auth/getAllAnnotation`);
  }

  deleteAnnotationById(id:number):Observable<{message:string}> {
    return this.http.delete<{message:string}>(`${this.baseUrl}api/admin/deleteAnnotation/${id}`,{headers:this.header});
  }

}
export interface Annotation{
  id?:number,
  message:string,
}
