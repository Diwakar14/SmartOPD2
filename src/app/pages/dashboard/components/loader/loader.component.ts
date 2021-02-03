import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { fadeOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [fadeOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

  @Input() loading: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
