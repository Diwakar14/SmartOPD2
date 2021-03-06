import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocCardComponent implements OnInit {

  @Input() docData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
