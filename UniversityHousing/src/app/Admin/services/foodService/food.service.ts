import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
private baseUrl:string=environment.baseUrl;
  constructor(private http: HttpClient) {}

  saveStudentMeal(studentId:number):Observable<{status:string}> {
    return this.http.post<{status:string}>(`${this.baseUrl}api/admin/save-student-meal?studentId=${studentId}`,{},{headers:environment.headers})
  }
  getTotalMeals(date:string):Observable<{totalMeals:number}>{
    return this.http.get<{totalMeals:number}>(`${this.baseUrl}api/admin/totalMeals?localDate=${date}`,{headers:environment.headers});
  }
}
