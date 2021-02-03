import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quick-access-items',
  templateUrl: './quick-access-items.component.html',
  styleUrls: ['./quick-access-items.component.scss']
})
export class QuickAccessItemsComponent implements OnInit {
  @Input() item;
  @Output() itemSelected = new EventEmitter();
  isActive: boolean;

  constructor() { }

  ngOnInit() {
    this.isActive = false;
  }

  setActive(val) {
    this.isActive = val;
  }

  selectItem() {
    this.itemSelected.emit(this.item);
  }
}
