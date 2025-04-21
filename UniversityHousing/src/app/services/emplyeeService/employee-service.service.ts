import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Employee} from '../../Classes/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = 'http://localhost:8084/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee);
  }

  updateEmployee(employee: Employee) {
    console.log('on -->'+employee);
    let url:string=this.baseUrl+'/'+employee.id;
    return this.httpClient.put<Employee>(url, employee);
  }

  deleteEmployee(id: number) {
    let usl:string = this.baseUrl+'/'+id;
    return this.httpClient.delete<Employee>(usl);
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
