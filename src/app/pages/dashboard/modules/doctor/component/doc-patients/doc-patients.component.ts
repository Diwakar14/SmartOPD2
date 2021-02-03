import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-patients',
  templateUrl: './doc-patients.component.html',
  styleUrls: ['./doc-patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocPatientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
