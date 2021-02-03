import { DoctorService } from './../../../../../../services/doctor.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.scss']
})
export class DocProfileComponent implements OnInit {

  doctorId: string;
  doctor: any;
  loading: boolean = false;
  constructor(private router: ActivatedRoute, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorId = this.router.snapshot.paramMap.get('id');
    this.loading = true;
    this.doctorService.getDoctor(this.doctorId).pipe(take(1)).subscribe(
      (res: any) => {
        this.doctor = res.doctor;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    )
  }

}
