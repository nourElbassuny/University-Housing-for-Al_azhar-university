import {HttpHeaders} from '@angular/common/http';

export const environment = {
  baseUrl: 'http://localhost:8084/',
  headers: new HttpHeaders({"Authorization": "Bearer " + localStorage.getItem("token")}),

};
