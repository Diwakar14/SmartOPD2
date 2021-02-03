import { Router } from '@angular/router';
import { fadeIn } from './../../../../animations/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, Input, OnInit, QueryList, ViewChildren, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER } from '@angular/cdk/keycodes';
import { QuickAccessItemsComponent } from './components/quick-access-items/quick-access-items.component';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
  animations: [
    fadeIn
  ]
})
export class QuickAccessComponent implements OnInit, AfterViewInit {

  quickAccessLinks: any[];
  keyboardEventsManager: ListKeyManager<any>;
  @Output() closeQuickAccess = new EventEmitter();
  @ViewChildren(QuickAccessItemsComponent) listItems: QueryList<any>;

  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    this.keyboardEventsManager = new ListKeyManager(this.listItems);
  }

  ngOnInit(): void {
    this.quickAccessLinks = [
      {
        icon: 'fa-user-md',
        name: 'Book Appointment',
        link: '/dashboard/appointments/book'
      },
      {
        icon: 'fa-bed',
        name: 'Patients',
        link: '/dashboard/patients'
      },
      {
        icon: 'fa-book',
        name: 'Reports',
        link: '/dashboard/reports'
      },
      {
        icon: 'fa-user-md',
        name: 'Doctors',
        link: '/dashboard/doctor'
      }
    ];
  }



  handleKeyUp(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if (this.keyboardEventsManager) {
      if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
        // passing the event to key manager so we get a change fired
        this.keyboardEventsManager.withWrap(true).onKeydown(event);
        this.listItems.map((item, index: number) => {
          if (this.keyboardEventsManager.activeItemIndex == index) {
            item.setActive(true);
          } else {
            item.setActive(false);
          }
        })
        return false;
      } else if (event.keyCode === ENTER) {
        // when we hit enter, the keyboardManager should call the selectItem method of the `ListItemComponent`
        this.keyboardEventsManager.activeItem.selectItem();
        return false;
      }
    }
  }
  showUserInfo(e) {
    // alert(JSON.stringify(e));
    this.closeQuickAccess.emit();
    this.router.navigateByUrl(e.link);
  }
}
