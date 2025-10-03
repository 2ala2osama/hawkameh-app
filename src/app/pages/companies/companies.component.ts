import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatatableComponent } from '../../shared/component/datatable/datatable.component';
import { CompanyAddEditComponent } from './company-add-edit/company-add-edit.component';

interface Company {
  id: number;
  name: any;
  email: any;
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatatableComponent,
    CompanyAddEditComponent,
  ],
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit {
  columns = [
    { field: 'id', label: 'ID' },
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
  ];

  companies: Company[] = [];
  showDialog = false;
  selectedCompany: any = null;
  editing = false;

  ngOnInit(): void {
    this.companies = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      name: `Company ${i + 1}`,
      email: `company${i + 1}@test.com`,
    }));
  }
  openDialog(company?: Company) {
    this.selectedCompany = company ? { ...company } : { name: '', city: '' };
    this.editing = !!company;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  saveCompany(company: Company) {
    if (this.editing && this.selectedCompany) {
      const index = this.companies.indexOf(this.selectedCompany);
      this.companies[index] = company;
    } else {
      this.companies.push(company);
    }
  }

  deleteCompany(row: Company) {
    this.companies = this.companies.filter((c) => c !== row);
  }
}
