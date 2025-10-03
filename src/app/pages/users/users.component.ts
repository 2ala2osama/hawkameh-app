import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DatatableComponent } from '../../shared/component/datatable/datatable.component';
import { UsersAddEditComponent } from './users-add-edit/users-add-edit.component';

interface User {
  id?: number;
  name: string;
  email: string;
  company: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DatatableComponent, UsersAddEditComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  columns = [
    { field: 'id', label: 'الرقم' },
    { field: 'name', label: 'الاسم' },
    { field: 'email', label: 'البريد الإلكتروني' },
    { field: 'role', label: 'الدور' },
    { field: 'company', label: 'الشركة' },
  ];

  users: User[] = [];
  paginatedData: User[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  showDialog = false;
  selectedUser: User | null = null;
  editing = false;

  ngOnInit(): void {
    // dummy data
    this.users = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@email.com`,
      role: 'مدير', // مثال بالعربية
      company: `شركة ${Math.ceil(Math.random() * 5)}`,
    }));

    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.users.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedData();
  }

  openDialog(user?: User) {
    this.selectedUser = user ? { ...user } : { name: '', email: '', role: '', company: '' };
    this.editing = !!user;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  saveUser(user: User) {
    if (this.editing && this.selectedUser) {
      const index = this.users.findIndex(u => u.id === this.selectedUser?.id);
      if (index > -1) this.users[index] = { ...user, id: this.selectedUser.id };
    } else {
      const newId = this.users.length ? Math.max(...this.users.map(u => u.id!)) + 1 : 1;
      this.users.push({ ...user, id: newId });
    }

    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.changePage(this.currentPage); // refresh current page
    this.closeDialog();
  }

  deleteUser(user: User) {
    this.users = this.users.filter(u => u.id !== user.id);
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    this.updatePaginatedData();
  }
}
