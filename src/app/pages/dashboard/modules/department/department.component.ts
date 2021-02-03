import { fromEvent, of, Subscription } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, AfterViewInit, OnDestroy {
  departments: any[];
  page: number = 1;
  loading = true;
  filteredDepartment: any[] = [];
  dept: Department;
  loadingSearchDataDept: boolean;

  searchSubscription: Subscription = new Subscription();
  @ViewChild('searchDepartment') searchDepartment: ElementRef<HTMLInputElement>;

  constructor(
    private departmentService: DepartmentService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.departmentService.getDepartment(true).pipe(take(1)).subscribe(
      (dept: any) => {
        this.departments = dept.departments;
        this.filteredDepartment = this.departments;
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    this.searchSubscription = fromEvent(this.searchDepartment.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        map((event: Event) => {
          return (<HTMLInputElement>event.target).value
        }),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.filteredDepartment = [];
        }),
        switchMap(value => this.departmentService.searchDepartment(value).pipe(catchError(err => of({ departments: [] }))))
      )
      .subscribe((res: any) => {
        this.filteredDepartment = res.departments;
        this.loading = false;
      }, err => {
        this.filteredDepartment = [];
        this.loading = false;
      }
      );
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(DialogComponent, {
    //   width: '350px',
    //   data: { name: this.dept.name }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.dept.name = result;
    //     this.departmentService.createDepartment(this.dept).subscribe(
    //       (res: any) => {
    //         Notiflix.Notify.Success("Department Added !");
    //         this.ngOnInit();
    //       },
    //       err => {
    //         console.log(err);
    //         Notiflix.Notify.Failure(err.message);
    //       }
    //     )
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

}
