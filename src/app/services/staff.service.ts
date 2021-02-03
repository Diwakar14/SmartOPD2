import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  getStaff(id) {
    return this.http.get(environment.endPoint + "/staff/" + id);
  }
  getStaffs(page: number = 1) {
    return this.http.get(environment.endPoint + "/staff?page=" + page);
  }

  searchStaff(q) {
    return this.http.get(environment.endPoint + "/staff?q=" + q);
  }

  updateStaff(id, staff) {
    return this.http.put(environment.endPoint + "/staff/" + id, staff);
  }


  createUser(users) {
    return this.http.post(environment.endPoint + "/staff", users, { observe: 'response' });
  }
}
