import Notiflix from 'notiflix';
import { fadeIn } from './../../../../animations/animations';
import { AppntDetailsDialogComponent } from './../../components/appnt-details-dialog/appnt-details-dialog.component';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { fromEvent, of, Subscription } from 'rxjs';
import { debounceTime, tap, map, delay, distinctUntilChanged, take, switchMap, catchError } from 'rxjs/operators';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MatDialog } from '@angular/material/dialog';

class Filter {
  start_date: any;
  end_date: any;
  app_only: boolean = false;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AppointmentsComponent implements OnInit, AfterViewInit, OnDestroy {

  allAppointments = [];
  filteredAppointments = [];

  p: number = 1;
  total: number;
  loading: boolean = true;
  filter: Filter = new Filter();
  filterApplied = false;

  appointemntListSubscription = new Subscription();
  searchSubscription = new Subscription();
  filterSubscription = new Subscription();

  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 20,
    currentPage: 1
  };
  params: HttpParams;
  query: string;
  @ViewChild('searchAppointment') searchAppointment: ElementRef;

  constructor(private appointmentService: AppointmentService, private dialog: MatDialog) { }


  ngAfterViewInit(): void {
    this.searchSubscription = fromEvent(this.searchAppointment.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: Event) => {
          this.query = (<HTMLInputElement>event.target).value
          if (this.filter.end_date || this.filter.start_date || this.filter.app_only) {
            this.params = new HttpParams()
              .set("start_date", this.filter.start_date != null ? this.filter.start_date : '')
              .set("end_date", this.filter.start_date != null ? this.filter.end_date : '')
              .set("app_only", this.filter.app_only + '')
              .set("q", this.query);
          } else {
            this.params = new HttpParams()
              .set("q", this.query);
          }
          return this.params;
        }),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.filteredAppointments = [];
        }),
        switchMap(value => this.appointmentService.getAppointmentsWithFilter(this.params).pipe(catchError(err => of({ data: { data: [] } }))))
      )
      .subscribe((res: any) => {
        this.filteredAppointments = res.data.data;
        this.config.totalItems = res.data.total;
        this.loading = false;
      }, err => {
        this.filteredAppointments = [];
        this.loading = false;
        this.config.totalItems = 0;
      }
      );
  }


  ngOnInit(): void {
    this.getPage(1);
    // this.clear_filter();
    this.filter.end_date = '';
    this.filter.start_date = '';
    this.query = '';
    this.filter.app_only = false;
    // $('#appointment_search').val('');
  }
  applyFilter() {
    this.loading = true;
    let filterData: any = {};

    this.filter.app_only = !this.filter.app_only;

    this.filteredAppointments = [];
    this.params = new HttpParams()
      .set('q', this.query || '');

    if (this.filter.start_date || this.filter.end_date) {
      filterData.start_date = this.filter.start_date;
      filterData.end_date = this.filter.end_date;
      this.params = new HttpParams()
        .set('start_date', filterData.start_date || '')
        .set('end_date', filterData.end_date || '')
        .set('q', this.query || '');
    }
    if (this.filter.app_only) {
      filterData.start_date = this.filter.start_date;
      filterData.end_date = this.filter.end_date;
      filterData.app_only = this.filter.app_only;
      this.params = new HttpParams()
        .set('start_date', filterData.start_date || '')
        .set('end_date', filterData.end_date || '')
        .set('app_only', filterData.app_only || false)
        .set('q', this.query || '');
    }

    this.appointmentService.getAppointmentsWithFilter(this.params).pipe(take(1)).subscribe((res: any) => {
      this.config.totalItems = res.data.total;
      this.config.itemsPerPage = res.data.per_page;
      this.loading = false;
      this.filteredAppointments = res.data.data;
    },
      err => {
        this.loading = false;
        this.filteredAppointments = [];
        this.config.totalItems = 0;
        Notiflix.Notify.Failure(err.error.message)
      })
  }

  clear_filter() {
    this.filter.end_date = '';
    this.filter.start_date = '';
    this.query = '';
    this.filter.app_only = false;
    this.getPage(1);
    // $('#appointment_search').val('');


  }

  getPage(page: number) {
    this.loading = true;
    this.filteredAppointments = [];
    if (this.filter.start_date || this.filter.end_date || this.query) {
      this.params = new HttpParams()
        .set('start_date', this.filter.start_date || '')
        .set('end_date', this.filter.end_date || '')
        .set('q', this.query || '')
        .set('page', page + '' || '');
    } else {
      this.params = new HttpParams()
        .set('page', page + '' || '');
    }

    if (this.filter.app_only) {
      this.params = new HttpParams()
        .set('start_date', this.filter.start_date || '')
        .set('end_date', this.filter.end_date || '')
        .set('app_only', this.filter.app_only + '')
        .set('q', this.query || '')
        .set('page', page + '' || '');
    }
    this.appointmentService.getAppointmentsWithFilter(this.params).pipe(take(1)).subscribe(
      (res: any) => {
        this.config.totalItems = res.data.total;
        this.config.itemsPerPage = res.data.per_page;
        this.p = page;
        this.loading = false;
        this.filteredAppointments = res.data.data;
        // console.log(this.filteredAppointments);
      },
      err => {
        this.loading = false;
        this.config.totalItems = 0;
        this.filteredAppointments = [];
      }
    );
  }

  showDetails(data) {
    this.dialog.open(AppntDetailsDialogComponent, {
      width: '700px',
      height: '600px',
      data: { appointment: data },
      disableClose: false,
      id: 'showDetails-appmnt'
    });
    this.dialog.getDialogById('showDetails-appmnt').afterClosed().subscribe((res: any) => {
      if (res == 1) {
        this.ngOnInit();
      }
    })
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
