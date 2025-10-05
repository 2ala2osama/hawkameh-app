import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-add-edit.component.html',
})
export class CompanyAddEditComponent {
  @Input() company: any = { name: '', city: '' , address:''};
  @Input() editing = false;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.company?.name || '', Validators.required],
      email: [this.company?.city || '', Validators.required],
            address: [this.company?.address || '', Validators.required],

    });
  }

  ngOnChanges() {
    if (this.form) {
      this.form.patchValue({
        name: this.company?.name || '',
        email: this.company?.email || '',
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
