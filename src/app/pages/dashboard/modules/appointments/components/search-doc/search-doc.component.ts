import { PatientService } from './../../../../../../services/patient.service';
import { DoctorService } from './../../../../../../services/doctor.service';
import { fromEvent, of, Subscription } from 'rxjs';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { debounceTime, tap, switchMap, catchError, map } from 'rxjs/operators';

type DoctorType = {
  id: number,
  name: string,
  phone: string,
  photo: string,
  ref_id: string,
}

interface DocResult {
  department_id: number,
  designation: string,
  doctor: DoctorType,
  doctor_id: number,
  id: number,
  isActive: boolean,
  qualifications: []
}

interface SearchResult {
  doctors: DocResult[],
  icon: string,
  id: number,
  name: string,
  photo: string,
}


@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss']
})
export class SearchDocComponent implements OnInit, AfterViewInit {

  searchDocSubscription: Subscription = new Subscription();
  loadingSearchDataDoc: boolean = false;
  filteredDoctors: SearchResult[];

  @ViewChild('searchDocAppnt') searchDocAppnt: ElementRef<HTMLInputElement>;
  @Output() selectedItem = new EventEmitter();

  constructor(private doctorService: DoctorService) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.searchDocSubscription = fromEvent(this.searchDocAppnt.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: Event) => {
          return (<HTMLInputElement>event.target).value
        }),
        tap(() => {
          this.loadingSearchDataDoc = true;
        }),
        switchMap(value => this.doctorService.searchDoctors(value).pipe(catchError(err => of({ data: [] }))))
      ).subscribe((res: any) => {
        this.filteredDoctors = res.data;
        this.loadingSearchDataDoc = false;
      }, err => {
        this.filteredDoctors = [];
        this.loadingSearchDataDoc = false;
      });
  }

  onSelected(selectedItem: DocResult) {
    this.selectedItem.emit(selectedItem);
    this.filteredDoctors = [];
  }

}
