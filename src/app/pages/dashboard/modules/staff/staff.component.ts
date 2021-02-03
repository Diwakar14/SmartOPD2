import jwt_decode from 'jwt-decode';
import { StaffDialogComponent } from './components/staff-dialog/staff-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import { debounceTime, take } from 'rxjs/operators';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  p: number = 1;
  filteredStaff = [];
  total: number;
  role = '';
  loading: boolean = true;

  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 20,
    currentPage: 1
  };

  constructor(private dialog: MatDialog,
    private cookie: CookieService,
    private staff: StaffService) { }

  ngOnInit(): void {
    this.getPage(1);
    var decoded: any = jwt_decode(this.cookie.get('auth_token'));
    this.role = decoded.allowed[0];
  }

  searchStaff(searchData) {
    this.loading = true;
    let data = searchData.target.value.toLowerCase();
    this.staff.searchStaff(data).pipe(take(1)).pipe(
      debounceTime(1000),
    ).subscribe(
      (res: any) => {
        this.filteredStaff = res.users.data;
        this.loading = false;
        this.config.totalItems = res.users.total;
      },
      err => {
        this.loading = false;
      }
    );
  }

  addStaff() {
    this.dialog.open(StaffDialogComponent, {
      width: '400px',
      data: { origin: 'Staff List' },
      disableClose: true,
      id: 'addStaff'
    }).afterClosed().pipe(take(1)).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  editStaff(staff) {
    if (this.role == 'Admin') {
      this.dialog.open(StaffDialogComponent, {
        width: '400px',
        data: { origin: 'Staff List', staff: staff },
        disableClose: true,
        id: 'editStaff'
      });
      this.dialog.getDialogById("editStaff").afterClosed().pipe(take(1)).subscribe((res) => {
        if (res == 1)
          this.ngOnInit();
      });
    }
  }

  getPage(page: number) {
    this.loading = true;
    this.staff.getStaffs(page).pipe(take(1)).subscribe(
      (res: any) => {
        this.config.totalItems = res.users.total;
        this.config.itemsPerPage = res.users.per_page;
        this.p = page;
        this.loading = false;
        this.filteredStaff = res.users.data;
      },
      err => {
        this.loading = false;
      }
    );
  }
}
