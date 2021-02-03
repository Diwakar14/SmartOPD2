import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router, private cookie: CookieService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUserToken: any = this.cookie.get('auth_token');
    if (currentUserToken != null && parseInt(localStorage.getItem('isUser')) == 1) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
