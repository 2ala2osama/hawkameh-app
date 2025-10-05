import {
  Component,

} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../shared/component/file-upload/file-upload.component';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hawkameh',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, RouterLink, RouterModule],

  templateUrl: './hawkameh.component.html',
  styleUrl: './hawkameh.component.scss',
})
export class HawkamehComponent {
  currentSection: string = 'policies';
  years = [4, 5]; // e.g., 2024, 2025

  constructor(public authService: AuthService, private sanitizer: DomSanitizer) { }

  showSection(section: string) {
    this.currentSection = section;
  }


  // When file upload emits the uploaded URL
  electedFile: File | null = null;
  fileUrl: SafeResourceUrl | null = null;
  isImage = false;
  isPdfOrDoc = false;
  selectedFile: any
  fileType: any;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];
    const ext = this.selectedFile.name.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      this.fileType = 'pdf';
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.selectedFile));
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext!)) {
      this.fileType = 'image';
      this.fileUrl = URL.createObjectURL(this.selectedFile);
    } else if (['doc', 'docx'].includes(ext!)) {
      this.fileType = 'word';
      // convert file to base64 to pass to Google Docs viewer
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: this.selectedFile!.type });
        const fileUrl = URL.createObjectURL(blob);
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://docs.google.com/gview?url=${fileUrl}&embedded=true`
        );
      };
      reader.readAsArrayBuffer(this.selectedFile);
    } else {
      this.fileType = null;
      this.fileUrl = null;
    }
  }


uploadFile(): void {
  if(!this.selectedFile) return;

  // You can implement backend upload here if needed
  console.log('Uploading file:', this.selectedFile.name);
}

clearSelectedFile() {
  this.selectedFile = null;
  this.fileUrl = null;
  this.isImage = false;
  this.isPdfOrDoc = false;
}

saveFile() {
  if (!this.selectedFile) return;
  // هنا يمكنك إضافة منطق حفظ الملف في السيرفر أو محليًا
  alert('✅ تم حفظ الملف: ' + this.selectedFile.name);
}
}
