import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-users-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-add-edit.component.html',
  styleUrl: './users-add-edit.component.scss',
})
export class UsersAddEditComponent {
  @Input() users: any = { name: '', city: '' };
  @Input() editing = false;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
roles:any;
companies:any;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.users?.name || '', Validators.required],
      email: [this.users?.city || '', Validators.required],
      role: [[], Validators.required],
      company: [[], Validators.required],
    });

      this.roles = ['CEO', 'Admin', 'Super Admin', 'Investor'];
  this.companies = [
    { id: 1, name: 'Tech Corp' },
    { id: 2, name: 'Global Holdings' },
    { id: 3, name: 'NextGen Solutions' },
    { id: 4, name: 'Health Plus' },
  ];
  }

  ngOnChanges() {
    if (this.form) {
      this.form.patchValue({
        name: this.users?.name || '',
        email: this.users?.email || '',
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.close.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}
