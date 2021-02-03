import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptComponent implements OnInit {

  @Input() confirmBooking: any;
  @Input() current_token: any;
  @Input() consultation_fees: any;
  @Input() origin: any;
  constructor() { }

  ngOnInit(): void {
  }

}
