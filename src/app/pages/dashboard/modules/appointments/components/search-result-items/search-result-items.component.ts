import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-result-items',
  templateUrl: './search-result-items.component.html',
  styleUrls: ['./search-result-items.component.scss']
})
export class SearchResultItemsComponent implements OnInit {

  @Input() item: any;
  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectCard(selectItem) {
    this.onChange.emit(selectItem);
  }

}
