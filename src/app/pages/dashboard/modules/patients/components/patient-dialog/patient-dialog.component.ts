import Notiflix from 'notiflix';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.scss']
})
export class PatientDialogComponent implements OnInit {
  patient: Patient = new Patient();
  submit: boolean;
  loading: boolean;
  phoneUniqueErrors: boolean;

  constructor(private patientService: PatientService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<PatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.type != 'create') {
      this.patient.id = this.data.patientId;
      this.patient.name = this.data.pat.name;
      this.patient.age = this.data.pat.age;
      this.patient.gender = this.data.pat.gender;
      this.patient.photo = this.data.pat.photo;
      this.patient.ref_id = this.data.pat.ref_id;
      this.patient.phone = this.data.pat.phone;
      this.patient.whatsapp_number = this.data.pat.whatsapp_number;
      this.patient.blood_group = this.data.pat.blood_group;
      this.patient.dob = this.data.pat.dob;
    }
  }

  checkUniqueness(phone: NgModel) {
    if (phone.valid) {
      this.phoneUniqueErrors = true;
      this.authService.uniquePhone({ phone: phone.model }).pipe(take(1)).subscribe((res: any) => {
        Notiflix.Notify.Success(res.message);
        this.phoneUniqueErrors = false;
      }, err => {
        Notiflix.Notify.Failure(err.error.message);
        this.patient.phone = '';
        this.phoneUniqueErrors = false;
      })
    } else {
      this.phoneUniqueErrors = false;
    }
  }

  addPatient(f: NgForm) {
    this.loading = true;
    let patientData = new FormData();
    patientData.append("name", this.patient.name);
    patientData.append("gender", this.patient.gender);
    patientData.append("age", this.patient.age);

    if (this.patient.dob) {
      patientData.append("dob", this.patient.dob);
    }
    if (this.patient.ref_id) {
      patientData.append("ref_id", this.patient.ref_id);
    }
    if (this.patient.phone) {
      patientData.append("phone", this.patient.phone);
    }
    if (this.patient.whatsapp_number) {
      patientData.append("whatsapp_number", this.patient.whatsapp_number);
    }

    let patientJSON = {
      name: this.patient.name,
      dob: this.patient.dob,
      gender: this.patient.gender,
      phone: this.patient.phone,
      whatsapp_number: this.patient.whatsapp_number,
      ref_id: this.patient.ref_id,
      age: this.patient.age,
    }

    if (this.patient.id != null) {
      this.patientService.updatePatients(this.patient.id, JSON.stringify(patientJSON)).pipe(take(1)).subscribe((res: any) => {
        Notiflix.Notify.Success("Patient Updated.");
        this.submit = true;
        this.loading = false;
        this.dialogRef.close(false);
      }, err => {
        Notiflix.Notify.Success("Patient Updated Failed!");
        this.submit = false;
        this.loading = false;
      }
      );
    } else {
      this.patientService.addPatients(patientData).pipe(take(1)).subscribe(
        (res: any) => {
          Notiflix.Notify.Success("Patient Added.");
          this.submit = true;
          this.loading = false;
          this.dialogRef.close(res);
        }, err => {
          if (err.status == 500) {
            Notiflix.Notify.Failure("Possible Incorrect or duplicate information.");
          } else if (err.status == 406) {
            Notiflix.Notify.Failure(err.error.error.phone[0]);
          }
          console.log(err);
          this.loading = false;
          this.submit = true;
        });
    }
  }
  checkPhone() {
    if (this.patient.isWhatsAppNoSameAsPhone) {
      this.patient.whatsapp_number = this.patient.phone;
    }
  }
}
