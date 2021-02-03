import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  markers: ApexMarkers,
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-doc-chart',
  templateUrl: './doc-chart.component.html',
  styleUrls: ['./doc-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocChartComponent implements OnInit, AfterContentInit {

  @ViewChild("chart") chart: ChartComponent;
  @Input() chartTitle;
  @Input() loading: boolean;
  public chartOptions: Partial<ChartOptions>;

  constructor() { }


  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Online Consultation",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          color: "#ff8a3b"
        },
        {
          name: "OPD Visit",
          data: [10, 50, 25, 51, 49, 92, 79, 91, 148],
          color: "#00997C"
        }
      ],
      chart: {
        height: 250,
        type: "line",
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: [4, 7]
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      grid: {
        padding: { bottom: 10, right: 10 },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };
  }

  ngAfterContentInit(): void {

  }
}
