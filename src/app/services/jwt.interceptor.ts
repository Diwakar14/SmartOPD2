import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let access_token = this.cookie.get('auth_token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`
      }
    });

    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.status === 200) {
            if (evt.headers.get('authorization')) {
              let auth_token = evt.headers.get('authorization');
              let expire = evt.headers.get('expires');

              var now = new Date();
              var time = now.getTime();
              var expireTime = time + (parseInt(expire) * 1000);

              if (this.cookie.check('auth_token')) {
                this.cookie.deleteAll();
              }
              this.cookie.set('auth_token', auth_token, new Date(expireTime), "http://localhost:4200", "localhost", true, "None");
              localStorage.setItem('isUser', '1');
            }
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.cookie.delete('auth_token');
          this.cookie.delete('role');
          localStorage.setItem("isUser", '-1');
          this.router.navigate(['/login']);
        }
        else if (error.status === 403) {
          localStorage.setItem('isUser', '0');
          this.router.navigateByUrl('/login');
        } else if (error.status === 500) {
          // Notiflix.Notify.Failure(error.error.message);
        } else if (error.status === 0) {
          // Notiflix.Notify.Failure("No Internet Connection or Server not responding.");
        }
        return throwError(error);
      })
    );
  }
}
