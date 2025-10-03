import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {  HttpClientModule } from '@angular/common/http';

// Register Chart.js components
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective , HttpClientModule], // 👈 Add RouterModule
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
 company = {
    name: 'Trading Company',
    age: '10 years',
    type: 'LLC'
  };

  board = {
    members: 5,
    start: '2025-01-01',
    end: '2025-12-31'
  };

  investors = {
    number: 20,
    ratio: 50
  };

  capital = {
    registered: '$1,000,000',
    shares: 100000,
    ratio: 100
  };

  // Pie Chart (Investors)
  pieChartType: 'pie' = 'pie';
  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Investor A', 'Investor B', 'Investor C'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#13655bff', '#21d8c3ff', '#0e9787']
      }
    ]
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  // Line Chart (Time Series Example)
  lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 120, 150, 130, 170, 200],
        borderColor: '#0e9787',
        backgroundColor: '#14a191ff',
        fill: true,
        tension: 0.4
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  };

  // Progress circle values (for Paid-up Capital)
  capitalPercent: number = 75;
}

