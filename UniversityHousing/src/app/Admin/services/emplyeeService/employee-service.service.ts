import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Employee} from '../../../Classes/employee/employee';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = 'http://localhost:8084/api/admin/employees';

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee,{headers:environment.headers});
  }

  updateEmployee(employee: Employee) {
    console.log('on -->'+employee);
    let url:string=this.baseUrl+'/'+employee.id;
    return this.httpClient.put<Employee>(url, employee,{headers:environment.headers});
  }

  deleteEmployee(id: number) {
    let usl:string = this.baseUrl+'/'+id;
    return this.httpClient.delete<Employee>(usl,{headers:environment.headers});
  }
}

interface GetResponseEmployee {
  _embedded: {
    employees: Employee[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
