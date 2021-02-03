import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Subscription, fromEvent, of } from 'rxjs';
import { debounceTime, tap, switchMap, catchError, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition("* => void", [
        style({ opacity: 1, transform: "translateY(0px)" }),
        animate('100ms ease-in-out', style({ opacity: 0, transform: "translateY(20px)" }))
      ]),
      transition("void => *", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate('100ms ease-in-out', style({ opacity: 0, transform: "translateY(0px)" }))
      ]),
    ])
  ]
})
export class DoctorComponent implements OnInit, AfterViewInit, OnDestroy {

  loading = true;
  filteredDoctors: any = [];
  search_field: any;
  isGridView: boolean = true;
  searchDocSubscription: Subscription = new Subscription();
  @ViewChild('searchDoctor') searchDoctor: ElementRef<HTMLInputElement>;

  constructor(private doctorService: DoctorService) {
    let viewState = localStorage.getItem('isGridView');
    if (viewState)
      this.isGridView = JSON.parse(localStorage.getItem('isGridView')).isActive;
  }


  ngAfterViewInit(): void {
    this.searchDocSubscription = fromEvent(this.searchDoctor.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: Event) => {
          return (<HTMLInputElement>event.target).value
        }),
        tap(() => {
          this.filteredDoctors = [];
          this.loading = true;
        }),
        switchMap(value => this.doctorService.searchDoctors(value).pipe(catchError(err => of({ data: [] }))))
      ).subscribe((res: any) => {
        this.filteredDoctors = res.data;
        this.loading = false;
      }, err => {
        this.filteredDoctors = [];
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.doctorService.getDoctors().pipe(take(1)).subscribe(
      (res: any) => {
        this.filteredDoctors = res.data;
        this.loading = false;
      }, () => {
        this.loading = false;
      }
    )
  }

  onChange(checked) {
    this.isGridView = !checked.isActive;
    localStorage.setItem('isGridView', JSON.stringify({ isActive: this.isGridView }));
  }

  ngOnDestroy(): void {
    this.searchDocSubscription.unsubscribe();
  }
}
