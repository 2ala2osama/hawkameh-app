import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../shared/component/file-upload/file-upload.component';
import { Network, Node, Edge } from 'vis-network';

@Component({
  selector: 'app-hawkameh',
  standalone: true,
  imports: [CommonModule , FileUploadComponent],
 
  templateUrl: './hawkameh.component.html',
  styleUrl: './hawkameh.component.scss'
})
export class HawkamehComponent implements  AfterViewChecked{
  currentSection: string = 'policies';
  years = [4, 5]; // e.g., 2024, 2025

  constructor(public authService: AuthService) {}

  showSection(section: string) {
    this.currentSection = section;
  }
  @ViewChild('orgChart', { static: false }) orgChart!: ElementRef;
  network!: Network;
  networkInitialized = false;

  ngAfterViewChecked() {
    if (this.currentSection === 'structure' && this.orgChart && !this.networkInitialized) {
      this.networkInitialized = true;

    const nodes = [
  { id: 1, label: 'CEO', size: 50 },
  { id: 2, label: 'Manager 1', size: 100 },
  { id: 3, label: 'Manager 2', size: 100 },
  { id: 4, label: 'Employee 1', size: 100 },
  { id: 5, label: 'Employee 2', size: 100 },
];
      const edges = [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ];

      const container = this.orgChart.nativeElement;
      const data = { nodes, edges };
      const options = {
        layout: { hierarchical: true },
        nodes: { shape: 'box', color: '#0e9787', font: { color: 'white' } },
        edges: { arrows: { to: true } },
        physics: false,
      };

      this.network = new Network(container, data, options);
    }
  }
}