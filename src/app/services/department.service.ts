import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  getDepartment(doctor?: boolean) {
    return this.http.get(environment.endPoint + "/departments?doctors=" + doctor)
  }
  searchDepartment(q) {
    return this.http.get(environment.endPoint + "/departments?q=" + q);
  }
  createDepartment(department: Department) {
    return this.http.post(environment.endPoint + "/departments", department);
  }
}
