import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-pat',
  templateUrl: './search-pat.component.html',
  styleUrls: ['./search-pat.component.scss']
})
export class SearchPatComponent implements OnInit {

  loadingSearchDataPat: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
