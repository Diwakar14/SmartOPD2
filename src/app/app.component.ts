import Notiflix from 'notiflix';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'SmartOPD Hospital';
  loading;
  eventSubscription = new Subscription();
  constructor(private router: Router) {
    this.loading = false;
  }

  ngAfterViewInit(): void {
    Notiflix.Notify.Init(
      {
        width: '300px',
        fontSize: '14px',
        timeout: 4000,
        messageMaxLength: 200,
        fontFamily: 'Mukta, sans serif',
        cssAnimationStyle: 'from-top',
        position: 'right-top',
      });
    this.eventSubscription = this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          setTimeout(() => {
            this.loading = true;
          })
          // this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          })
          // this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
