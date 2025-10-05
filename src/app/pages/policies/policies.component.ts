import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadComponent } from "../../shared/component/file-upload/file-upload.component";

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent {
files: any[] = [
  {
    name: 'Policy1.pdf',
    type: 'application/pdf',
    url: '/uploads/policy1.pdf'
  },
  {
    name: 'CouncilImage.jpg',
    type: 'image/jpeg',
    url: '/uploads/council.jpg',
    previewUrl: '/uploads/council.jpg'
  }
];

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    const newFile: any = {
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file) // create temporary URL for preview
    };

    // If image, add previewUrl
    if (file.type.startsWith('image/')) {
      newFile.previewUrl = newFile.url;
    }

    // Push to the array
    this.files.push(newFile);

    // Optional: clear input so same file can be selected again
    input.value = '';
  }
}

previewFile(file: any) {
  if (file.type.startsWith('image/') && file.previewUrl) {
    window.open(file.previewUrl, '_blank');
  } else if (file.type === 'application/pdf') {
    window.open(file.url, '_blank');
  } else {
    alert('لا يمكن معاينة هذا النوع من الملفات.');
  }
}


addFile(event: any) {
  const file: File = event; // file emitted from child
  const url = URL.createObjectURL(file); // create local URL for preview/download
  const previewUrl = file.type.startsWith('image/') ? url : null;

  this.files.push({
    name: file.name,
    type: file.type,
    url,
    previewUrl
  });
}
}