import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, public authService: AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      // this.http.post('/api/upload', formData).subscribe(response => console.log('Uploaded', response));
      console.log('File uploaded:', this.selectedFile.name);
      alert('File uploaded successfully!');
      this.selectedFile = null;
    }
  }
}