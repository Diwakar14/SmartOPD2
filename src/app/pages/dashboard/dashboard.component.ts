import { fadeOut } from './../../animations/animations';
import { trigger, transition, animate, style } from '@angular/animations';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import Scrollbar from 'smooth-scrollbar';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { ShortcutInput, AllowIn, ShortcutEventOutput, KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeOut]

})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  isSidebarCollapsed: boolean = false;
  shortcuts: ShortcutInput[] = [];
  showQA: boolean = false;
  loaded: boolean = true;
  eventSubscription = new Subscription();

  @ViewChild('input') input: ElementRef;
  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

  constructor(private router: Router) {
    this.eventSubscription = this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaded = false;
          break;
        }
        case event instanceof NavigationEnd: {
          setTimeout(() => {
            this.loaded = true;
          }, 200);
          break;
        }
        default: {
          break;
        }
      }
    });
    let sidebarState = JSON.parse(localStorage.getItem('sidebar'))?.sidebar;
    this.isSidebarCollapsed = sidebarState;
  }


  ngOnInit(): void {
    let options = {
      enable: true,
      damping: 0.1,
      continuousScrolling: true,
      effect: 'bounce',
      maxOverscroll: 120
    }
    Scrollbar.initAll(options);

  }
  closeQuickAccess(): void {
    this.showQA = false;
  }



  toogleSidebar(event) {
    this.isSidebarCollapsed = event;
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "cmd + b",
        command: (output: ShortcutEventOutput) => {
          this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        preventDefault: true
      },
      {
        key: "cmd + q",
        command: (output: ShortcutEventOutput) => {
          this.showQA = !this.showQA;
        },
        preventDefault: true
      }
    );
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
