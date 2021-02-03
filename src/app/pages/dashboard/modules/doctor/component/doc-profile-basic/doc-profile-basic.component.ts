import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-profile-basic',
  templateUrl: './doc-profile-basic.component.html',
  styleUrls: ['./doc-profile-basic.component.scss']
})
export class DocProfileBasicComponent implements OnInit {

  @Input() doctorData: any;
  @Input() loading: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
