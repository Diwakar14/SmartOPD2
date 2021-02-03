import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-review',
  templateUrl: './doc-review.component.html',
  styleUrls: ['./doc-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
