import Notiflix from 'notiflix';
import * as jwt_decode from 'jwt-decode';
import { Component, OnInit, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { SlotService } from 'src/app/services/slot.service';
import { FormControl, NgForm } from '@angular/forms';
import { Holiday } from 'src/app/models/holidays.model';
import { HolidayService } from 'src/app/services/holiday.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-doc-holiday',
  templateUrl: './doc-holiday.component.html',
  styleUrls: ['./doc-holiday.component.scss'],
})
export class DocHolidayComponent implements OnInit, AfterViewInit {

  allholidays = [];
  loading;
  loadHoliday: boolean;
  holidays: Holiday = new Holiday();
  @Input() doctorId;
  @Input() days;
  @Input() active;

  disable = false;
  slots: any = [];
  role: any = 'Admin';
  docDeleted: any = false;
  constructor(private holidayService: HolidayService,
    private cookie: CookieService,
    private dialog: MatDialog,
    private slotService: SlotService) { }


  ngOnInit(): void {
    this.getHolidays();
    this.loading = true;

    // var decoded = jwt_decode(this.cookie.get('auth_token'));
    // this.role = decoded.allowed[0];
    this.getSlots();
    // this.stateService.currentApprovalDelDocMessage.subscribe((res: any) => {
    //   this.docDeleted = !JSON.parse(res);
    // })
  }

  ngAfterViewInit(): void {
    // this.stateService.currentApprovalrefreshStateMessage.subscribe((res: any) => {
    //   if (JSON.parse(res).state == true) {
    //     this.getSlots();
    //   }
    // });
  }

  getSlots() {
    this.slotService.getAllSlotsOfDoctor(this.doctorId).pipe(take(1)).subscribe(
      (res: any) => {
        this.slots = res.slots;
        this.loading = false;
      },
      err => {
        this.loading = false;
        if (err.error.message == 'No Slots') {
          this.slots = [];
        }
      }
    )
  }
  getHolidays() {
    this.holidayService.getHolidays(this.doctorId).pipe(take(1)).subscribe(
      (res: any) => {
        this.allholidays = res.holidays;
        this.loadHoliday = false;
      },
      err => {
        // console.log(err);
        if (err.error.message == 'Holiday Not Found') {
          this.allholidays = [];
        }
        this.loadHoliday = false;
      }
    );
  }

  SelectTime(event, i) {
    this.days.forEach(day => day.disabled = true);
    this.days[i].disabled = false;
  }

  createHolidays(f: NgForm) {
    this.loading = true;
    this.disable = true;
    let slots = JSON.stringify(this.holidays.slots);

    let holiday = {
      doctor: this.doctorId,
      start_date: this.holidays.start_date,
      end_date: this.holidays.end_date,
      slots: slots
    }

    this.holidayService.createHolidays(holiday).pipe(take(1)).subscribe(
      (res: any) => {
        if (res.status == 200) {
          Notiflix.Notify.Success("Holidays Assigned.");
          this.getHolidays();
          this.holidays.slots = [];
          f.reset();
          this.loading = false;
          this.disable = false;
        } else if (res.status == 206) {
          this.loading = false;
          // this.dialog.open(CofirmCreateHolidayDialogComponent, {
          //   width: '400px',
          //   id: 'holidayConfirm',
          //   disableClose: true,
          //   data: { origin: 'Holiday', message: res.body.message, payload: holiday }
          // });
          this.dialog.getDialogById('holidayConfirm').afterClosed().pipe(take(1)).subscribe((res: any) => {
            if (res.success == 1) {
              this.ngOnInit();
              f.reset();
            }
            this.disable = false;
          });
        }
      },
      err => {
        // console.log(err);
        // Notiflix.Notify.Failure(err.error.message);
        this.disable = false;
        this.loading = false;
      }
    );
  }

  deleteHoliday(holiday) {
    // this.dialog.open(CancelHolidayDialogComponent, {
    //   width: '400px',
    //   id: 'cancelHoliday',
    //   disableClose: true,
    //   data: { origin: 'Holiday', holiday: holiday }
    // });
    // this.dialog.getDialogById('cancelHoliday').afterClosed().subscribe((res: any) => {
    //   if (res.success == 1) {
    //     this.ngOnInit();
    //   }
    // })
  }


}
