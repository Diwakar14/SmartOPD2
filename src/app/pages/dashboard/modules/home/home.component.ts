import { ElementRef, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexResponsive,
} from "ng-apexcharts";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  responsive: ApexResponsive,
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chart: ElementRef<HTMLDivElement>;
  @ViewChild('columnChart') columnChart: ElementRef<HTMLDivElement>;
  @ViewChild('donutChart') donutChart: ElementRef<HTMLDivElement>;
  public chartOptions: Partial<ChartOptions>;

  constructor() {

  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Admitted",
          data: [31, 40, 28, 51, 42, 109, 100],
          color: '#7cd6d4'
        },
        {
          name: "Discharged",
          data: [11, 32, 45, 32, 34, 52, 41],
          color: "#fcb256"
        }
      ],
      chart: {
        width: '100%',
        height: 320,
        type: "area",
        redrawOnParentResize: true,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  ngAfterViewInit(): void {
    am4core.useTheme(am4themes_animated);
    this.createBulletChart();
    this.createDonutChart();
    this.createColumnChart();
  }



  createColumnChart() {
    let chart = am4core.create(this.columnChart.nativeElement, am4charts.XYChart);
    chart.colors.list = [
      am4core.color("#ea8b24"),
      am4core.color("#E6EBF4"),
    ];
    chart.data = [{
      "country": "USA",
      "visits": 3025
    }, {
      "country": "China",
      "visits": 1882
    }, {
      "country": "Japan",
      "visits": 1809
    }, {
      "country": "Germany",
      "visits": 1322
    }, {
      "country": "UK",
      "visits": 1122
    }, {
      "country": "France",
      "visits": 1114
    }, {
      "country": "India",
      "visits": 984
    }, {
      "country": "Spain",
      "visits": 4000
    }, {
      "country": "Netherlands",
      "visits": 665
    }, {
      "country": "Russia",
      "visits": 580
    }, {
      "country": "South Korea",
      "visits": 443
    }, {
      "country": "Canada",
      "visits": 441
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    // categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 0.5;

    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    chart.fontSize = 12;
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 40;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    series.columns.template.adapter.add("fill", function (fill, target, key) {
      if (target.dataItem.index === 7)
        return chart.colors.getIndex(0);
      return chart.colors.getIndex(1);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
  }

  createBulletChart() {
    let container = am4core.create(this.chart.nativeElement, am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "vertical";

    let colors = ["#cffffd", "#ffe7ae", "#cffffd", "#ffe7ae", "#cffffd", "#ffe7ae", "#cffffd", "#ffe7ae", "#cffffd", "#ffe7ae",];

    /* Create chart instance */
    let chart = container.createChild(am4charts.XYChart);
    // chart.colors.list = colors;
    chart.paddingRight = 0;
    chart.paddingLeft = -20;

    /* Add data */
    chart.data = [
      {
        "category": "1",
        "value": 65,
        "target": 65
      },
      {
        "category": "2",
        "value": 78,
        "target": 78
      },
      {
        "category": "3",
        "value": 45,
        "target": 45,
      }
    ];

    /* Create axes */
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 10;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.numberFormatter.numberFormat = "#'k'";
    valueAxis.renderer.baseGrid.disabled = true;

    /* 
      In order to create separate background colors for each range of values, 
      you have to create multiple axisRange objects each with their own fill color 
    */
    let start = 0, end = 10;
    for (var i = 0; i < 10; ++i) {
      this.createRange(valueAxis, start, end, am4core.color(colors[i]));
      start += 10;
      end += 10;
    }

    /* Create series */
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "category";
    series.columns.template.fill = am4core.color("#000");
    series.columns.template.stroke = am4core.color("#000");
    series.columns.template.strokeWidth = 1;
    series.columns.template.strokeOpacity = 0.5;
    chart.fontSize = 12;

    series.columns.template.height = am4core.percent(10);
    series.tooltipText = "{value}"
    series.legendSettings.labelText = "Series: [bold {color}]{name}[/]";



    let series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.valueX = "target";
    series2.dataFields.categoryY = "category";
    series2.strokeWidth = 1;
    series2.noRisers = true;
    series2.startLocation = 0.15;
    series2.endLocation = 0.8;
    series2.tooltipText = "{valueX}"
    series2.stroke = am4core.color("#000");

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    valueAxis.cursorTooltipEnabled = false;
    chart.arrangeTooltips = false;
  }

  private createRange(axis, from, to, color) {
    let range = axis.axisRanges.create();
    range.value = from;
    range.endValue = to;
    range.axisFill.fill = color;
    range.axisFill.fillOpacity = 0.8;
    range.label.disabled = true;
    range.grid.disabled = true;
  }

  createDonutChart() {
    // Create chart instance
    var donutChart = am4core.create(this.donutChart.nativeElement, am4charts.PieChart);
    donutChart.colors.list = [
      am4core.color("#fcb256"),
      am4core.color("#00d3af"),
    ];
    donutChart.fontSize = 12;
    // Add data
    donutChart.data = [{
      "country": "Online",
      "litres": 89
    }, {
      "country": "OPD",
      "litres": 40
    },];

    // Add and configure Series
    var pieSeries = donutChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.innerRadius = am4core.percent(60);
    pieSeries.ticks.template.disabled = false;
    pieSeries.labels.template.disabled = false;

    let rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    pieSeries.slices.template.adapter.add("fill", function (fill, target, key) {
      let index = 0;
      if (target.dataItem != undefined) {
        index = target.dataItem.index === 0 ? 0 : 1;
      }
      return donutChart.colors.getIndex(index);
    });

    donutChart.legend = new am4charts.Legend();
    donutChart.legend.position = "bottom";

  }
}
