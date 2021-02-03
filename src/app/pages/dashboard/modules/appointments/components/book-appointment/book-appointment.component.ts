import { Component, OnInit } from '@angular/core';

interface BookAppointmentTypes {
  doctor: number,
  slot: number,
  patient: number,
  offline_payment: boolean
}

type SelectedDocType = {
  name: string,
  photo: string,
  designation: string
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {

  bookAppointmentAttr: BookAppointmentTypes;
  constructor() { }

  ngOnInit(): void {
  }

  selectedDoc(selectedDoctor) {
    console.log(selectedDoctor);
    this.bookAppointmentAttr.doctor = selectedDoctor.doctor_id;
  }

}
