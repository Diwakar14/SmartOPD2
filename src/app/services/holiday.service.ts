import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {


  constructor(private http: HttpClient) { }

  createHolidays(holidays) {
    return this.http.post(environment.endPoint + "/holidays", holidays, { observe: 'response' });
  }

  getHolidays(doctorId: number) {
    return this.http.get(environment.endPoint + "/holidays/" + doctorId);
  }

  deleteHolidays(doctorId: number) {
    return this.http.delete(environment.endPoint + "/holidays/" + doctorId, { observe: 'response' });
  }
}
