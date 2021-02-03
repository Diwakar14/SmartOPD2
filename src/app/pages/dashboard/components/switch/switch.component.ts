import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements OnInit {

  isActive: boolean = false;
  @Input() leftLabel: string;
  @Input() rightLabel: string;
  @Output() changeSwitch = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onChange(check: HTMLInputElement) {
    this.isActive = check.checked;
    this.changeSwitch.emit({ isActive: this.isActive });
  }

}
