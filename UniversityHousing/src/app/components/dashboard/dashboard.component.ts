import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from '../commons/sidebar/sidebar.component';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from 'highcharts-angular';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    HighchartsChartModule
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  Highcharts: typeof Highcharts = Highcharts; // Required
  chartOptions!: Highcharts.Options;

  ngOnInit() {
    this.setupChart();
 }
  setupChart() {
    this.chartOptions = {
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
        text: 'Gender Distribution',
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
        innerSize: '40%', // donut style
        data: [
          { name: 'Male', y: (10 / 15) * 100, color: '#3498db' },
          { name: 'Female', y: (5 / 15) * 100, color: '#e91e63' },
          { name: 'Unspecified', y: 0, color: '#95a5a6' }
        ]
      }]
    };
  }

}
