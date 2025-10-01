import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Register Chart.js components
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule , BaseChartDirective], // 👈 Add RouterModule
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
   // Line chart data
  public lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'Orders',
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  public lineChartOptions = {
    responsive: true
  };

  // Pie chart data
  public pieChartData = {
    labels: ['Success', 'Failed', 'Pending'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b']
      }
    ]
  };
  public pieChartOptions = {
    responsive: true
  };
}
