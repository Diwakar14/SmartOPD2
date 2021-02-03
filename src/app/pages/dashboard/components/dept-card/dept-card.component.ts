import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept-card',
  templateUrl: './dept-card.component.html',
  styleUrls: ['./dept-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeptCardComponent implements OnInit {


  @Input() department: any;
  constructor() { }

  ngOnInit(): void {
  }

}
