import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isSidebarCollapsed: boolean = false;
  date: any;
  isFullScreen: boolean = false;
  loading: boolean = false;

  @Output() toggle = new EventEmitter();
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.date = new Date();
  }
  onClick() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem('sidebar', JSON.stringify({ sidebar: this.isSidebarCollapsed }));
    this.toggle.emit(this.isSidebarCollapsed);
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullScreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullScreen = false;
      }
    }
  }

  confirmLogout() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      id: 'logout-confirm',
      disableClose: false,
      data: { title: 'Confirm Logout?', info: 'Are you sure want to logout?' }
    });

  };




}
