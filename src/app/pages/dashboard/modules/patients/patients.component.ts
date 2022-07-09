import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from './components/patient-dialog/patient-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { fromEvent, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, AfterViewInit, OnDestroy {

  p: number = 1;
  loading: boolean = true;
  patients;
  filteredPatients: any = [];
  total: number;

  public config: PaginationInstance = {
    id: 'pagination2',
    itemsPerPage: 20,
    currentPage: 1
  };
  query: string;
  searchSubscription = new Subscription()
  @ViewChild('searchPatient') searchPatient: ElementRef;

  constructor(private patientService: PatientService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPage(1);
  }

  ngAfterViewInit(): void {
    this.searchSubscription = fromEvent(this.searchPatient.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: Event) => {
          return (<HTMLInputElement>event.target).value
        }),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.filteredPatients = [];
        }),
        switchMap(value => this.patientService.searchPatients(value).pipe(catchError(err => of({ data: { data: [] } }))))
      )
      .subscribe((res: any) => {
        this.filteredPatients = res.data.data;
        this.config.totalItems = res.data.total;
        this.loading = false;
      }, err => {
        this.filteredPatients = [];
        this.loading = false;
        this.config.totalItems = 0;
      }
      );
  }



  getPage(page: number) {
    this.loading = true;
    this.filteredPatients = [];
    this.patientService.getPage(page).pipe(take(1)).subscribe(
      (res: any) => {
        this.config.totalItems = res.data.total;
        this.config.itemsPerPage = res.data.per_page;
        this.p = page;
        this.loading = false;
        this.filteredPatients = res.data.data;
      },
      err => {
        this.loading = false;
      }
    );
  }

  addPatient() {
    this.dialog.open(PatientDialogComponent, {
      width: '450px',
      data: { origin: 'patients', type: 'create' },
      id: 'createPatient',
      disableClose: true
    });
    this.dialog.getDialogById('createPatient').afterClosed().pipe(take(1)).subscribe(
      (data: any) => {
        if (data.patient != null || data.patient != undefined)
          this.ngOnInit();
      }
    )
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

}
