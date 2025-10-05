import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {

 constructor(public authService:AuthService){
  
 }
@Input() sendFlag = false; // optional for image preview
  @Output() fileSelected = new EventEmitter<File>(); // emit file to parent
  @Input() visible: boolean = true; // flag to show/hide component

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isImage = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.isImage = this.selectedFile.type.startsWith('image/');

      // Emit the file to parent
      this.fileSelected.emit(this.selectedFile);

      // Optional preview for images
      if (this.isImage && this.sendFlag) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.previewUrl = null;
      }
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    // You can implement backend upload here if needed
    console.log('Uploading file:', this.selectedFile.name);
  }}