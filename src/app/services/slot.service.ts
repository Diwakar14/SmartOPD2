import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private http: HttpClient) { }

  getAllSlotsOfDoctor(doctorId: number) {
    return this.http.get(environment.endPoint + "/slots/doctor/" + doctorId)
  }
  getAvailableSlotsOfDoctor(doctorId: number) {
    return this.http.get(environment.endPoint + "/slots/doctor/" + doctorId + "/available")
  }
  createSlots(slot) {
    return this.http.post(environment.endPoint + "/slots", slot);
  }

  deleteSlot(slotId, password?: any) {
    let url = environment.endPoint + "/slots/" + slotId;
    if (password != null)
      return this.http.delete(url + "?password=" + password, { observe: 'response' });
    return this.http.delete(url, { observe: 'response' });
  }
  editSlot(slotId, data) {
    return this.http.put(environment.endPoint + "/slots/" + slotId, data, { observe: 'response' });
  }
}
