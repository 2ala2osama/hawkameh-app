import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../../shared/component/file-upload/file-upload.component';
import { CommonModule } from '@angular/common';
import SignaturePad from 'signature_pad';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
interface Meeting {
  id: number;
  name: string;
  status: 'live' | 'ended' | 'upcoming';
  date: string;
  time: string;
  type: string;
  voteStart?: string;
  voteEnd?: string;
  purpose?: string;
  participants?: string[];
}

@Component({
  selector: 'app-generals-meetings',
  standalone: true,
  imports: [FileUploadComponent, CommonModule, FormsModule],
  templateUrl: './generals-meetings.component.html',
  styleUrl: './generals-meetings.component.scss',
})
export class GeneralsMeetingsComponent {
  searchTerm = '';
  filterStatus = '';
  filterDate = '';

  meetings: Meeting[] = [
    {
      id: 1,
      name: 'اجتماع مجلس الإدارة',
      status: 'live',
      date: '2025-10-10',
      time: '10:00',
      purpose: 'مراجعة الميزانية',
      participants: ['أحمد', 'ليلى'],
      type: 'Committee',
    },
    {
      id: 2,
      name: 'اجتماع المستثمرين',
      status: 'upcoming',
      date: '2025-10-12',
      time: '14:00',
      purpose: 'خطة التوسع',
      participants: ['محمد', 'عمر'],
      type: 'Committee',
    },
  ];

  selectedMeeting: Meeting | null = null;
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  showSignaturePad = false;

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  signatureImg: string = '';
  signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 500,
    canvasHeight: 200,
    backgroundColor: '#f8f8f8',
    penColor: '#003c73',
  };
  additionalFiles: File[] = [];
  files: File[] = [];
  constructor(public authService: AuthService) {}
  // ✅ SignaturePad

  onFilesSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files.push(...Array.from(input.files));
    }
  }

  onAdditionalFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.additionalFiles = Array.from(input.files);
    }
  }

  uploadAdditionalFiles() {
    if (!this.additionalFiles.length) return;

    const formData = new FormData();
    this.additionalFiles.forEach((file) => formData.append('files', file));
  }

  get filteredMeetings(): Meeting[] {
    return this.meetings.filter((m) => {
      const matchesSearch = this.searchTerm
        ? m.name.includes(this.searchTerm)
        : true;
      const matchesStatus = this.filterStatus
        ? m.status === this.filterStatus
        : true;
      const matchesDate = this.filterDate ? m.date === this.filterDate : true;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  selectMeeting(meeting: Meeting) {
    this.selectedMeeting = meeting;
    setTimeout(() => this.signaturePad?.clear(), 100); // ✅ إعادة ضبط التوقيع عند فتح التفاصيل
  }

  clearSelection() {
    this.selectedMeeting = null;
  }

  saveSignature() {
    this.signatureImg = this.signaturePad.toDataURL();
    this.showSignaturePad = false;
  }

  openSignaturePad() {
    this.showSignaturePad = true;
    setTimeout(() => {
      this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
    });
  }

  closeSignaturePad() {
    this.showSignaturePad = false;
  }

  clearSignature() {
    this.signaturePad.clear();
  }
}
