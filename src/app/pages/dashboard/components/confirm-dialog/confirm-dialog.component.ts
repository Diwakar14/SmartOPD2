import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
interface IDailog {
  title: string,
  info: string,
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  loading: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private authService: AuthService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.loading = true;
    this.authService.logOut().pipe().subscribe(
      res => {
        this.cookie.delete('auth_token');
        this.cookie.delete('role');
        this.cookie.deleteAll();

        localStorage.setItem('isUser', '0');
        this.loading = false;
        this.dialogRef.close();
        this.router.navigate(['/login']);
      }
    )
  }

}
