import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from '../commons/sidebar/sidebar.component';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from 'highcharts-angular';
import {formatDate, NgForOf} from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    HighchartsChartModule,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsList: Highcharts.Options[] = [];

  ngOnInit() {
    this.chartOptionsList = [
      this.setupChart('نسبة الذكور إلى الإناث', [
        { name: 'Male', y: (10 / 15) * 100, color: '#3498db' },
        { name: 'Female', y: (5 / 15) * 100, color: '#e91e63' },
        { name: 'Unspecified', y: 0, color: '#95a5a6' }
      ]),
      this.setupChart('نسبة الطلاب حسب المرحلة الدراسية', [
        { name: 'Stage 1', y: 30, color: '#8e44ad' },
        { name: 'Stage 2', y: 25, color: '#2980b9' },
        { name: 'Stage 3', y: 35, color: '#2980b9' },
        { name: 'Stage 4', y: 15, color: '#27ae60' }
      ]),
      this.setupChart('نسبة التخصصات الجامعية', [
        { name: 'كلية العلوم', y: 25, color: '#f39c12' },
        { name: 'كلية طب الاسنان', y: 20, color: '#d35400' },
        { name: 'كلية التجارة', y: 15, color: '#c0392b' },
        { name: 'كلية الطب', y: 10, color: '#16a085' },
        { name: 'كلية الهندسة', y: 12, color: '#2980b9' },
        { name: 'كلية الصيدلة', y: 8, color: '#8e44ad' },
        { name: 'كلية التمريض', y: 5, color: '#2c3e50' },
        { name: 'كلية الحاسبات والمعلومات', y: 5, color: '#27ae60' }
      ])
    ];
 }
  setupChart(title: string, data: Highcharts.PointOptionsObject[]): Highcharts.Options {
    return {
      chart: {
        type: 'pie',
        backgroundColor: '#f4f6f7',
        borderRadius: 12,
        shadow: true,
        style: {
          fontFamily: 'Segoe UI, Roboto, sans-serif'
        }
      },
      title: {
        text: title,
        style: {
          fontSize: '20px',
          color: '#2c3e50'
        }
      },
      tooltip: {
        pointFormat: '<b>{point.name}</b>: {point.y:.1f}%'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderColor: '#fff',
          borderWidth: 2,
          dataLabels: {
            enabled: true,
            style: {
              color: '#2c3e50',
              fontSize: '14px',
              textOutline: 'none',
            },
            format: '<b>{point.name}</b>: {point.y:.1f} %'
          }
        }
      },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        itemStyle: {
          color: '#34495e',
          fontWeight: 'bold'
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        innerSize: '40%',
        data: data
      }]
    };
  }

}
